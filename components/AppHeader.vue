<template>
  <div>
    <v-toolbar
      dark
      prominent
    >
      <v-app-bar-nav-icon />

      <v-toolbar-title>SEAT GENERATOR</v-toolbar-title>

      <v-menu>
        <template #activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
            Activator slot
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>
