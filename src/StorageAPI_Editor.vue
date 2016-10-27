<template>
    <div>
        <status></status>
        <navigation
            :mode="mode"
            :table="table"
            :row="row">
        </navigation>
        <editor v-if="!loading"
            :mode="mode"
            :table="table"
            :row="row"
            :buffer="buffer">
        </editor>
    </div>
</template>

<script>
    // Instantiate a central event-handler
    window.bus = new Vue({ name: 'EventHandler' });

    // APIclient mixin
    import APIclient from './mixins/APIclient.vue'

    // Components
    import Status from './components/Status.vue'
    import Navigation from './components/Navigation.vue'
    import Editor from './components/Editor.vue'

    // Configuration
    window.STORAGEAPI_DOMAIN = 'http://StorageAPI.dev';

    export default {
        name: 'StorageAPI_Editor',
        components: { Status, Navigation, Editor },
        mixins: [ APIclient ],
        data: function() {
            return {
                buffer: [],
                loading: false,
                mode: '',
                table: '',
                row: 0
            }
        },
        created: function() {
            bus.$on('buffer', (data) => this.buffer = data );
            bus.$on('mode', (mode) => this.mode = mode );
            bus.$on('table', (table) => this.table = table );
            bus.$on('row', (row) => this.row = row );
        }
    }
</script>
