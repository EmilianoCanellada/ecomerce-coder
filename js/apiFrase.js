const quote = document.querySelector('#quote');
                        const author = document.querySelector('#author');
                        const fraseBtn = document.querySelector('#fraseBtn');

                        fraseBtn.addEventListener("click", getQuote)

                        function getQuote() {
                            fetch("http://quotable.io/random") // Consumo la api "quotable.io/random"
                                .then(res => res.json())
                                .then(data => {
                                    quote.innerHTML = `"${data.content}"`;
                                    author.innerHTML = `"${data.author}"`;
                                })
                        }