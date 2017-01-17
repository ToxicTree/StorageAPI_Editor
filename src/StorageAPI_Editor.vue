<template>
    <div id="storageapi-editor">
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
    if (!window.bus)
        window.bus = new Vue({ name: 'EventHandler' });

    // Configuration
    window.STORAGEAPI_DOMAIN = 'http://StorageAPI.dev';

    module.exports = {
        name: 'StorageAPI_Editor',
        components: {
            'Status': require('./components/Status.vue'),
            'Navigation': require('./components/Navigation.vue'),
            'Editor': require('./components/Editor.vue')
        },
        mixins: [ require('./mixins/APIclient.vue') ],
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
        },
        destroyed: function() {
            bus.$off('buffer');
            bus.$off('mode');
            bus.$off('table');
            bus.$off('row');
        }
    }
</script>

<style>
    /* Table tools (Fallback Text) */
    .table_edit:before {
        content: 'Edit';
    }
    .table_delete:before {
        content: 'Delete';
    }
    .table_new:before {
        content: 'New';
    }
</style>
