package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	// "strings"
	"time"

	"github.com/chromedp/chromedp"
)

type Item struct {
	Titulo string `json:"titulo"`
	Enlace string `json:"enlace"`
	Imagen string `json:"imagen"`
}

func main() {
	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.Flag("headless", true),
		chromedp.Flag("disable-gpu", true),
		chromedp.Flag("disable-extensions", true),
		chromedp.Flag("disable-dev-shm-usage", true),
		chromedp.Flag("no-sandbox", true),
		chromedp.Flag("ignore-certificate-errors", true),
	)

	allocCtx, cancel := chromedp.NewExecAllocator(context.Background(), opts...)
	defer cancel()

	ctx, cancel := chromedp.NewContext(allocCtx, chromedp.WithLogf(log.Printf))
	defer cancel()

	ctx, cancel = context.WithTimeout(ctx, 60*time.Second)
	defer cancel()

	url := "https://www.bn.gov.ar"
	var htmlContent string

	err := chromedp.Run(ctx,
		chromedp.Navigate(url),
		chromedp.WaitVisible(`.panels-row`, chromedp.ByQuery),
		chromedp.Sleep(5*time.Second),
		chromedp.OuterHTML("html", &htmlContent),
	)

	if err != nil {
		log.Fatalf("Error al navegar: %v", err)
	}

	// Guardar HTML para diagnóstico
	if err := os.WriteFile("pagina.html", []byte(htmlContent), 0644); err != nil {
		log.Printf("Error al guardar HTML: %v", err)
	}

	var agendaResults, noticiasResults string

	// Extraer Agenda
	err = chromedp.Run(ctx,
		chromedp.EvaluateAsDevTools(`
			(() => {
				const agenda = [];
				const sections = document.querySelectorAll('h5.text-gray');
				for (const section of sections) {
					if (section.textContent.includes('AGENDA')) {
						const panelRow = section.parentElement.nextElementSibling.nextElementSibling;
						if (panelRow && panelRow.classList.contains('panels-row')) {
							const items = panelRow.querySelectorAll('.col-xs-12.col-sm-6.col-md-4');
							for (const item of items) {
								const link = item.querySelector('a');
								if (!link) continue;
								const heading = item.querySelector('.panel-heading');
								const h3 = link.querySelector('h3');
								const titulo = h3 ? h3.textContent.trim() : '';
								const enlace = link.href;
								let imagen = '';
								if (heading && heading.style.backgroundImage) {
									imagen = heading.style.backgroundImage
										.replace(/^url\(['"]?/, '')
										.replace(/['"]?\)$/, '');
								}
								agenda.push({ titulo, enlace, imagen });
							}
						}
						break;
					}
				}
				return JSON.stringify(agenda);
			})()
		`, &agendaResults),
	)

	if err != nil {
		log.Fatalf("Error al extraer agenda: %v", err)
	}

	// Extraer Noticias
	err = chromedp.Run(ctx,
		chromedp.EvaluateAsDevTools(`
			(() => {
				const noticias = [];
				const sections = document.querySelectorAll('h5.text-gray');
				for (const section of sections) {
					if (section.textContent.includes('NOTICIAS')) {
						const panelRow = section.parentElement.nextElementSibling.nextElementSibling;
						if (panelRow && panelRow.classList.contains('panels-row')) {
							const items = panelRow.querySelectorAll('.col-xs-12.col-sm-6.col-md-4');
							for (const item of items) {
								const link = item.querySelector('a.panel');
								if (!link) continue;
								const heading = item.querySelector('.panel-heading');
								const h3 = link.querySelector('.newsflash-title');
								const titulo = h3 ? h3.textContent.trim() : '';
								const enlace = link.href;
								let imagen = '';
								if (heading && heading.style.backgroundImage) {
									imagen = heading.style.backgroundImage
										.replace(/^url\(['"]?/, '')
										.replace(/['"]?\)$/, '');
								}
								noticias.push({ titulo, enlace, imagen });
							}
						}
						break;
					}
				}
				return JSON.stringify(noticias);
			})()
		`, &noticiasResults),
	)

	if err != nil {
		log.Fatalf("Error al extraer: %v", err)
	}

	// Procesar resultados
	var agenda, noticias []Item
	if err := json.Unmarshal([]byte(agendaResults), &agenda); err != nil {
		log.Fatalf("Error al parsear agenda: %v", err)
	}
	if err := json.Unmarshal([]byte(noticiasResults), &noticias); err != nil {
		log.Fatalf("Error al parsear noticias: %v", err)
	}

	// Guardar archivos
	if err := guardarItems(agenda, "agenda.json"); err != nil {
		log.Fatal(err)
	}
	if err := guardarItems(noticias, "noticias.json"); err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Se extrajeron %d items de agenda y %d noticias\n", len(agenda), len(noticias))
}

func guardarItems(items []Item, filename string) error {
	data, err := json.MarshalIndent(items, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(filename, data, 0644)
}
