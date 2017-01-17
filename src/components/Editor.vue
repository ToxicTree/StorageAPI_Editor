<template>
    <div id="editor" v-if="buffer">

        <database-editor v-if="table=='' && row==0"
            :mode="mode"
            :buffer="buffer">
        </database-editor>

        <table-editor v-if="table!='' && row==0"
            :mode="mode"
            :buffer="buffer">
        </table-editor>

        <row-editor v-if="table!='' && row!=0"
            :mode="mode"
            :table="table"
            :buffer="buffer">
        </row-editor>

    </div>
</template>

<script>
    module.exports = {
        name: 'Editor',
        props: [ 'buffer', 'mode', 'table', 'row' ],
        components: {
            'DatabaseEditor' : require('./editor/DatabaseEditor.vue'),
            'TableEditor' : require('./editor/TableEditor.vue'),
            'RowEditor' : require('./editor/RowEditor.vue'),
        }
    }
</script>
