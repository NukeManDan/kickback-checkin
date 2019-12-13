<template>
<q-layout view="hHh lPr fff" class="bg-grey-1">
  <q-header elevated height-hint="64">
    <q-toolbar class="GPL__toolbar" style="height: 64px">

      <q-toolbar-title class="row justify-center items-center no-wrap">
        <img src="~assets/kickback.png" height="40">
      </q-toolbar-title>

    </q-toolbar>
  </q-header>

  <q-page-container class="GPL__page-container">
    <router-view />
  </q-page-container>

</q-layout>
</template>

<script>
export default {
  name: 'KickbackLayout',

  data() {
    return {
      leftDrawerOpen: false,
    }
  }
}
</script>

<style lang="sass">
.GPL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 55%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368

    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px

  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500

  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>
