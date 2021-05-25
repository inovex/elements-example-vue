<template>
<ino-card>
  <div slot="header">
    <ino-header ino-title="Header" />
    <div class="flex-content">
      <ino-img
          class="my-avatar"
          ino-rounded
          width="200"
          alt="blank profile photo"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      />
      <h1>Marc Sutton</h1>
    </div>
  </div>
  <div slot="content">
    <ino-header ino-title="Content" />
    <ino-table>
      <ino-table-row slot="header" ino-header-row>
        <ino-table-cell>ID</ino-table-cell>
        <ino-table-cell>Column A</ino-table-cell>
        <ino-table-cell>Column B</ino-table-cell>
      </ino-table-row>
      <ino-table-row>
        <ino-table-cell ino-numeric>1</ino-table-cell>
        <ino-table-cell>Cell A1</ino-table-cell>
        <ino-table-cell>Cell B1</ino-table-cell>
      </ino-table-row>
      <ino-table-row>
        <ino-table-cell ino-numeric>2</ino-table-cell>
        <ino-table-cell>Cell A2</ino-table-cell>
        <ino-table-cell>Cell B2</ino-table-cell>
      </ino-table-row>
    </ino-table>
  </div>
  <div slot="footer">
    <ino-header ino-title="Footer" />
    <ino-button>Click me!</ino-button>
  </div>
</ino-card>
</template>

<script>
export default {
  name: "VCard"
}
</script>

<style scoped>
.flex-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

ino-header {
  margin: .5rem 0;
  display: block;
}
</style>
