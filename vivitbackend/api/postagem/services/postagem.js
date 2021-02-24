'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */

const axios = require("axios");

async function getHemobaInfo(postagens) {
  try {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;

    /* const body = await axios.get(`http://www5.saude.ba.gov.br/hemoba/index.php?option=com_content&view=article&id=1322&catid=13&Itemid=59`) */
    const dom = new JSDOM(postagens)

    const title = dom.window.document.querySelector('.contentheading')
    const date = dom.window.document.querySelector('.createdate')
    const post = dom.window.document.querySelector('.article-content')
    console.log(title.textContent.trim())
    console.log(date.textContent.trim())
    console.log(post.innerHTML)
    return {
      title: title.textContent.trim(),
      date: date.textContent.trim(),
      post: post.innerHTML
    }
  } catch (error) {
    console.log("getHemobaInfo", Exception(error))
  }
}

async function setImage() {
  try {
    const url = `http://www5.saude.ba.gov.br/hemoba/images/stories/Noticias/telefonesHemorrede.jpeg`
    const {data}  = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(data, "base64")

    const FormData = require("form-data");
    const formData = new FormData();

    formData.append('refId', 1)
    formData.append('ref', "postagem")
    formData.append('field', "balbalbl")
    formData.append('files', buffer)

    await axios({
      method: "POST",
      url: `http://${strapi.config.host}:${strapi.config.port}/upload`,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    });
    /* await axios.post(`http://${strapi.config.host}:${strapi.config.port}/upload`, formData, {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    }) */

    console.log("buffer")
    console.log(`Upando imagem "teste" - "teste.jpeg" `)
  }catch(error) {
    console.log("setImage", error)
  }
}


async function createPostagem(products) {
  await Promise.all(
    products.map(async (product) => {
      const item = await getByName(product.title, "game");

      if (!item) {
        console.info(`Creating: ${product.title}...`);

        const game = await strapi.services.game.create({
          name: product.title,
          slug: product.slug.replace(/_/g, "-"),
          price: product.price.amount,
          release_date: new Date(
            Number(product.globalReleaseDate) * 1000
          ).toISOString(),
          categories: await Promise.all(
            product.genres.map((name) => getByName(name, "category"))
          ),
          plataforms: await Promise.all(
            product.supportedOperatingSystems.map((name) =>
              getByName(name, "plataform")
            )
          ),
          developers: [await getByName(product.developer, "developer")],
          publishers: [await getByName(product.publisher, "publisher")],
          ...(await getGameInfo(product.slug)),
        });

        await setImage({ image: product.image, game });
        await Promise.all(
          product.gallery
            .slice(0, 6)
            .map((url) => setImage({ image: url, game, field: "gallery" }))
        );

        await timeout(2000);

        return game;
      }
    })
  );
}

async function createPosts(postagens){
  getHemobaInfo(postagens)
}

module.exports = {
  populate: async (params) => {
    try {

      /* setImage() */

      /* const gogApiUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&${qs.stringify(
        params
        )}`; */
        let page = 1322
        console.log(params)

        do{
          const gogApiUrl = `http://www5.saude.ba.gov.br/hemoba/index.php?option=com_content&view=article&id=000${page}&catid=13&Itemid=59`
          if(gogApiUrl !== 'defined'){
            const postagens = await axios.get(gogApiUrl);
            const { data } = postagens
            createPosts(data)
            page++
          }else{
            console('error...')
          }
        }while(page===1322)

    } catch (error) {
      console.log("Populate: ", error)
    }
    console.log('test')
  }
};
