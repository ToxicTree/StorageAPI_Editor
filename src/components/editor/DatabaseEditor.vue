<template>
    <table class="table table-default" v-if="buffer">
        <thead>
            <tr>
                <th>Table</th>
                <th>Columns</th>
                <th class="text-right">Tools</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="object in buffer">
                <td>
                    <a role="button" @click.prevent="nav({
                        path:'/'+object.tablename,
                    })">{{object.tablename}}</a>
                </td>
                <td>
                    <span v-for="(column, index) in object.columns">
                        {{ (index>0) ? ', '+column.name : column.name }}
                    </span>
                </td>
                <td>
                    <button type="button" class="table_edit" @click="nav({
                        path:'/'+object.tablename,
                        mode:'edit'
                    })"></button>
                    <button type="button" class="table_delete" @click="nav({
                        path:'/'+object.tablename,
                        method:'DELETE'
                    })"></button>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <button type="button" class="table_new" @click="nav({
                        path:'/',
                        mode:'edit',
                        method:'POST'
                    })"> Table</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: 'DatabaseEditor',
        props: [ 'buffer', 'mode' ],
        methods: {
            nav(e) { bus.$emit('navigate',e) }
        }
    }
</script>
