
import { cards_data } from "./fake_database/data.js";


window
    .addEventListener(
        "DOMContentLoaded", () => {
            const filter_buttons = (
                window.
                    document.
                    querySelectorAll(".c_filter_buttons__filter_btn")
            );

            const cards_container = (
                window.
                    document.
                    querySelector("[data-id='cards_container']")
            );

            // função para obter as visualizações do localStorage
            const funcGetViews = (card_id) => {
                const views = (
                    window
                        .localStorage
                        .getItem(`@Blog:card_views_${card_id}`)
                );

                return views
                    ? parseInt(views)
                    : 0
            };

            // função para criar vizualizações no localStorage
            const funcSetViews = (key_name, _value) => {
                window
                    .localStorage
                    .setItem(key_name, _value);
            };

            // função para incrementar as visualizações no localStorage
            const funcIncrementViews = (card_id) => {
                let views = funcGetViews(card_id);

                views++;

                funcSetViews(`@Blog:card_views_${card_id}`, views);
            };

            // função para renderizar os cards a partir do db fake
            const funcRenderCards = (filterd_cards) => {
                cards_container.innerHTML = "";

                filterd_cards.forEach(
                    (card_data) => {
                        const card_id = card_data.id;
                        const current_views = funcGetViews(card_id);

                        const max_description_length = 50;
                        let truncated_description = card_data.description;

                        if (truncated_description.length > max_description_length) {
                            truncated_description = (
                                truncated_description.substring(0, max_description_length) + "..."
                            )
                        }

                        const card_element = (
                            window
                                .document
                                .createElement("div")
                        );

                        card_element
                            .classList
                            .add("c_cards_container__card");

                        card_element
                            .dataset
                            .category = card_data.category;

                        card_element
                            .dataset
                            .id = card_data.id;

                        card_element.innerHTML = `
                        <img alt="Imagem de ${card_data.category}" src="${card_data.image}"/>

                        <div class="--c_padding_6">
                            <div>
                                <span>
                                    ${card_data.accentuated_category} 
                                </span>

                                <span>
                                    ${card_data.date}
                                </span>
                            </div>

                            <h3>
                                ${card_data.title}
                            </h3>

                            <p>
                                ${truncated_description}
                            </p>
                        </div>

                        <div class="c_cards_container__views_counter">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M288 144a110.18 110.18 0 0 0 -110.18 110.18V256H40.09C16.27 256 0 272.27 0 296.09c0 23.82 16.27 40.09 40.09 40.09H177.82A110.18 110.18 0 0 0 288 446.27a110.18 110.18 0 0 0 110.18-110.18V336h137.73c23.82 0 40.09-16.27 40.09-40.09c0-23.82-16.27-40.09-40.09-40.09H405.82A110.18 110.18 0 0 0 288 144zM288 368a80 80 0 1 1 0-160 80 80 0 1 1 0 160z" />
                            </svg>

                            <span class="views-count" data-view="${card_data.id}">
                                ${current_views}
                            </span>
                        </div>
                    `;

                        cards_container
                            .appendChild(card_element);

                        card_element.addEventListener(
                            "click", () => {
                                funcIncrementViews(card_data.id);

                                // cria uma navegação para a página details.html, enviando na url o id do card que será carregado
                                window
                                    .location
                                    .href = `src/details.html?id=${card_data.id}`
                            }
                        );
                    }
                );
            };

            // função para aplicar filtro
            const funcApplyFilter = (category) => {
                const filterd_cards = (
                    (category === "todos") // if(category === "todos") {
                        ? cards_data
                        // }
                        // else {
                        : cards_data.filter((card) => card.category === category)
                    // }
                );

                funcRenderCards(filterd_cards);

                const current_cards = (
                    cards_container
                        .querySelectorAll(".c_cards_container__card")
                );

                current_cards.forEach(
                    (card) => {
                        card
                            .classList
                            .remove("--c_opacity_0", "--c_scale_95");

                        card
                            .classList
                            .add("--c_opacity_100", "--c_scale_100");
                    }
                );
            };

            // adicionar listeners aos botões de filtro
            filter_buttons.forEach(
                (button) => {
                    button.addEventListener(
                        "click", () => {
                            // remover a classe de ativo de todos os botões
                            filter_buttons.forEach(
                                (button) => {
                                    button
                                        .classList
                                        .remove("--c_active");
                                }
                            );

                            button
                                .classList
                                .add("--c_active");

                            const category = (
                                button.dataset.category
                            );

                            funcApplyFilter(category);
                        }
                    );
                }
            );

            funcRenderCards(cards_data);
        }
    );