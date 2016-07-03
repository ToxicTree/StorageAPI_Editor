<template>

    <table class="table" v-if="!table && !row">
        <tr><th>Table</th><th>Columns</th><th class="text-right">Tools</th></tr>
        <tr v-for="object in $parent.data">
            <td><a @click="click" href='{{$root.nav}}' data-path='/{{object.tablename}}' data-table='{{object.tablename}}'>{{object.tablename}}</a></td>
            <td><span v-for="(index, column) in object.columns">{{ (index>0) ? ', '+column.name : column.name }}</span></td>
            <td>
                <button @click="click" type="button" class="btn pull-right" data-path='/{{object.tablename}}'
                        data-table='{{object.tablename}}' data-mode='edit'>Edit</button>
                <button @click="click" type="button" class="btn pull-right" data-path='/{{object.tablename}}'
                        data-method='DELETE'>Kill</button>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <button @click="click" type="button" class="btn pull-right" data-path='/'
                    data-method='post' data-mode='edit'>New</button>
            </td>
        </tr>
    </table>

    <table class="table" v-if="table && !row">
        <tr><th v-for="column in $parent.data[0].columns">{{column.name}}</th><th class="text-right">Tools</th></tr>
        <tr v-for="object in $parent.data[0].data">
            <td v-for="(index, value) in object">
                <a @click="click" v-if="index=='id'" href='{{$root.nav}}' data-path='/{{table}}/{{object.id}}'
                   data-table='{{table}}' data-row='{{object.id}}'>#{{object.id}}</a>
                <p v-else>{{value}}</p>
            </td>
            <td>
                <button @click="click" type="button" class="btn pull-right" data-path='/{{table}}/{{object.id}}'
                        data-table='{{table}}' data-row='{{object.id}}' data-mode='edit'>Edit</button>
                <button @click="click" type="button" class="btn pull-right" data-path='/{{table}}/{{object.id}}'
                        data-table='{{table}}' data-method='DELETE'>Kill</button>
            </td>
        </tr>
        <tr>
            <td colspan="{{$parent.data[0].columns.length+1}}">
                <button @click="click" type="button" class="btn pull-right" data-path='/{{table}}'
                        data-table='{{table}}' data-mode='edit'>Edit</button>
                <button @click="click" type="button" class="btn pull-right" data-path='/{{table}}'
                        data-method='DELETE'>Kill</button>
                <button @click="click" type="button" class="btn pull-right" data-path='/{{table}}'
                        data-table='{{table}}' data-row='0' data-method='post' data-mode='edit'>New</button>
            </td>
        </tr>
    </table>

    <table class="table" v-if="table && row">
        <tr><th>Column</th><th>Value</th></tr>
        <tr v-for="(index, value) in $parent.data[0]">
            <td>{{index}}</td>
            <td>{{value}}</td>
        </tr>
        <tr>
            <td>Tools:</td>
            <td>
                <button @click="click" type="button" class="btn" data-path='/{{table}}/{{row}}'
                        data-table='{{table}}' data-row='{{row}}' data-mode='edit'>Edit</button>
                <button @click="click" type="button" class="btn" data-path='/{{table}}/{{row}}'
                        data-table='{{table}}' data-method='DELETE'>Kill</button>
            </td>
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