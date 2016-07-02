<template>

    <table class="table" v-if="!table && !row">
        <tr><th>Table</th><th>Columns</th><th>Tools</th></tr>
        <tr v-for="object in $parent.data">
            <td><a @click="click" href='{{$root.nav}}' data-path='/{{object.tablename}}' data-table='{{object.tablename}}'>{{object.tablename}}</a></td>
            <td><span v-for="column in object.columns">{{column.name}}</span></td>
            <td>
                <a @click="click" href='{{$root.nav}}' data-path='/{{object.tablename}}' data-table='{{object.tablename}}' data-mode='edit'>Edit</a>
            </td>
        </tr>
    </table>

    <table class="table" v-if="table && !row">
        <tr><th v-for="column in $parent.data[0].columns">{{column.name}}</th><th>Tools</th></tr>
        <tr v-for="object in $parent.data[0].data">
            <td v-for="(index, value) in object">
                <a @click="click" v-if="index=='id'" href='{{$root.nav}}' data-path='/{{table}}/{{object.id}}'
                   data-table='{{table}}' data-row='{{object.id}}'>#{{object.id}}</a>
                <p v-else>{{value}}</p>
            </td>
            <td>
                <a @click="click" href='{{$root.nav}}' data-path='/{{table}}/{{object.id}}'
                   data-table='{{table}}' data-method='DELETE'>KILL</a>
                <a @click="click" href='{{$root.nav}}' data-path='/{{table}}/{{object.id}}'
                   data-table='{{table}}' data-row='{{object.id}}' data-mode='edit'>EDIT</a>
            </td>
        </tr>
    </table>

    <table class="table" v-if="table && row">
        <tr v-for="(index, value) in $parent.data[0]">
            <td>{{index}}</td>
            <td>{{value}}</td>
        </tr>
    </table>

</template>

<script>
    export default {
        props: [ 'table', 'row' ],
        methods: {
            debug(object){console.log(object)},
            click(e){
                this.$parent.navigate(
                    e.target.getAttribute('data-path'),
                    e.target.getAttribute('data-method'),
                    e.target.getAttribute('data-mode'),
                    e.target.getAttribute('data-table'),
                    e.target.getAttribute('data-row')
                );
            }
        }
    }
</script>