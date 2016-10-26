<template>
    <div v-if="buffer">

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
    import DatabaseEditor from './editor/DatabaseEditor.vue';
    import TableEditor from './editor/TableEditor.vue';
    import RowEditor from './editor/RowEditor.vue';

    export default {
        name: 'Editor',
        props: [ 'buffer', 'mode', 'table', 'row' ],
        components: { DatabaseEditor, TableEditor, RowEditor }
    }
</script>
