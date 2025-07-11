
import { cards_data } from "../fake_database/data.js";


window
    .addEventListener(
        "DOMContentLoaded", () => {
            // captura o id da url
            const url_params = (
                new URLSearchParams(
                    window.location.search
                )
            );

            const card_id = url_params.get("id");

            const detail_image = (
                funcGetHtmlElement("[data-id='detail_image']")
            );

            const detail_category = (
                funcGetHtmlElement("[data-id='detail_category']")
            );

            const detail_title = (
                funcGetHtmlElement("[data-id='detail_title']")
            );

            const detail_description = (
                funcGetHtmlElement("[data-id='detail_description']")
            );

            const detail_full_text = (
                funcGetHtmlElement("[data-id='detail_full_text']")
            );

            const detail_container_views_counter = (
                funcGetHtmlElement("[data-id='detail_container_views_counter']")
            );

            const detail_views_count = (
                funcGetHtmlElement("[data-id='detail_views_count']")
            );

            const detail_full_text_title = (
                funcGetHtmlElement("[data-id='detail_full_text_title']")
            );

            const detail_date = (
                funcGetHtmlElement("[data-id='detail_date']")
            );

            // Função para obter as visualizações do localStorage
            function funcGetViewsLocalStorage(card_id) {
                const views = (
                    window
                        .localStorage
                        .getItem(`@Blog:card_views_${card_id}`)
                );

                return (
                    views
                        ? parseInt(views)
                        : 0
                );
            };

            // função para capturar elemento html
            function funcGetHtmlElement(element_identification) {
                return (
                    window.document.querySelector(`${element_identification}`)
                )
            };

            // função para renderizar as informações do card
            function funcRenderCardInformation(elements_object) {
                elements_object.detail_image.setAttribute("src", elements_object.card.image);
                elements_object.detail_image.setAttribute("alt", elements_object.card.title);

                elements_object.detail_category.textContent = (
                    elements_object.card.accentuated_category
                );

                elements_object.detail_category.classList.add(elements_object.card.category);

                elements_object.detail_date.textContent = elements_object.card.date;
                elements_object.detail_date.classList.add(elements_object.card.category);

                elements_object.detail_title.textContent = elements_object.card.title;

                elements_object.detail_description.textContent = elements_object.card.description;

                elements_object.detail_full_text.textContent = elements_object.card.full_text;

                elements_object.detail_views_count.textContent = funcGetViewsLocalStorage(elements_object.card.id);
            };

            // função para renderizar as informações do quando não tiver card
            function funcRenderInformationIfNotCard(elements_object) {
                elements_object.detail_title.textContent = "Card não encontrado.😒";
                elements_object.detail_description.style.opacity = 0;
                elements_object.detail_full_text.textContent = "";
                elements_object.detail_image.style.opacity = 0;
                elements_object.detail_full_text_title.style.opacity = 0;
                elements_object.detail_category.style.opacity = 0;
                elements_object.detail_views_count.style.opacity = 0;
                elements_object.detail_container_views_counter.style.opacity = 0;
            };

            const elements_object = {
                detail_container_views_counter,
                detail_full_text_title,
                detail_description,
                detail_views_count,
                detail_full_text,
                detail_category,
                detail_image,
                detail_title,
                detail_date,
            };

            if (card_id) {
                const number_id = (
                    parseInt(card_id)
                );

                const card = (
                    cards_data.filter((card) => card.id === number_id)
                )[0];

                elements_object["card"] = card;

                if (card) {
                    funcRenderCardInformation(elements_object);
                }
                else {
                    funcRenderInformationIfNotCard(elements_object);
                }
            }
            else {
                funcRenderInformationIfNotCard(elements_object);
            }
        }
    );