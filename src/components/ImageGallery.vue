<template>
  <div>
    <ino-header ino-title="My Pictures" />
    <ino-img-list ino-enclose-label>
      <ino-img
          v-for="(img, i) in images" :key="i"
          :src="img.url"
          :alt="img.label"
          :ino-label="img.label"
          ino-img-list-item
          ino-rounded
      >
      </ino-img>
    </ino-img-list>
    <ino-header ino-title="My Pictures in a carousel" />
    <ino-carousel
        class="my-carousel"
        value="0"
        ino-autoplay="true"
        ino-animated="true"
        ino-hide-buttons="false"
        ino-infinite="true"
        ino-intermission="5000"
        ino-reverse="false"
    >
      <ino-carousel-slide
          v-for="(img, i) in images" :key="i"
          :value="i" :src="img.url"
      />
    </ino-carousel>
  </div>
</template>

<script>
export default {
  name: "ImageGallery",
  data: () => ({
    images: [
      { url: 'https://elements.inovex.de/dist/latest/storybook/static/media/beach.1432d4b3.jpg', label: 'Dummy Label'},
      { url: 'https://elements.inovex.de/dist/latest/storybook/static/media/waterfall.a7a46e49.jpg', label: 'Test Label'},
      { url: 'https://elements.inovex.de/dist/latest/storybook/static/media/trondheim.7a9953d8.jpg', label: 'Nice Image'},
      { url: 'https://elements.inovex.de/dist/latest/storybook/static/media/forrest.0452b993.jpg', label: 'Foo Bar'},
    ]
  })
}
</script>

<style scoped>
ino-header {
  margin: 1.5rem 0 .5rem 0;
  display: block;
}

.my-carousel {
  --ino-carousel-width: 100%;
}
</style>
