<template>

    <form class="form-horizontal" id="view">

        <template v-if="$parent.table && $parent.row">

            <div v-for="(index, value) in $parent.data[0]" class="form-group">
                <label class="col-sm-offset-2 col-sm-2 text-right" >
                    {{index}}
                </label>
                <div class="col-sm-5">
                    {{value}}
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-4 col-sm-5">
                    <div class="btn-group">
                        <button @click="click" type="button" class="btn btn-default" data-path='/{{table}}'
                                data-table='{{table}}'>Back</button>
                        <button @click="click" type="button" class="btn btn-default" data-path='/{{table}}/{{row}}'
                                data-table='{{table}}' data-row='{{row}}' data-mode='edit'>Edit</button>
                        <button @click="click" type="button" class="btn btn-danger" data-path='/{{table}}/{{row}}'
                                data-table='{{table}}' data-method='DELETE'>Kill</button>
                    </div>
                </div>
            </div>

        </template>

        <template v-if="table && !row">

            <table class="table" >
                <tr><th v-for="column in $parent.data[0].columns">{{column.name}}</th><th class="text-right">Tools</th></tr>
                <tr v-for="object in $parent.data[0].data">
                    <td v-for="(index, value) in object">
                        <a @click="click" v-if="index=='id'" href='{{$root.nav}}' data-path='/{{table}}/{{object.id}}'
                           data-table='{{table}}' data-row='{{object.id}}'>#{{object.id}}</a>
                        <p v-else>{{value}}</p>
                    </td>
                    <td>
                        <div class="btn-group pull-right">
                            <button @click="click" type="button" class="btn btn-default" data-path='/{{table}}/{{object.id}}'
                                    data-table='{{table}}' data-row='{{object.id}}' data-mode='edit'>Edit</button>
                            <button @click="click" type="button" class="btn btn-danger" data-path='/{{table}}/{{object.id}}'
                                    data-table='{{table}}' data-method='DELETE'>Kill</button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="{{$parent.data[0].columns.length+1}}">
                        <div class="btn-group pull-right">
                            <button @click="click" type="button" class="btn btn-default" data-path='/{{table}}'
                                    data-table='{{table}}' data-row='0' data-method='post' data-mode='edit'>New Post</button>
                            <button @click="click" type="button" class="btn btn-default" data-path='/{{table}}'
                                    data-table='{{table}}' data-mode='edit'>Edit Table</button>
                            <button @click="click" type="button" class="btn btn-danger" data-path='/{{table}}'
                                    data-method='DELETE'>Kill Table</button>
                        </div>
                    </td>
                </tr>
            </table>

        </template>

        <template v-if="!table && !row">

            <table class="table">
                <tr><th>Table</th><th>Columns</th><th class="text-right">Tools</th></tr>
                <tr v-for="object in $parent.data">
                    <td><a @click="click" href='{{$root.nav}}' data-path='/{{object.tablename}}' data-table='{{object.tablename}}'>{{object.tablename}}</a></td>
                    <td><span v-for="(index, column) in object.columns">{{ (index>0) ? ', '+column.name : column.name }}</span></td>
                    <td>
                        <div class="btn-group pull-right">
                            <button @click="click" type="button" class="btn btn-default" data-path='/{{object.tablename}}'
                                    data-table='{{object.tablename}}' data-mode='edit'>Edit</button>
                            <button @click="click" type="button" class="btn btn-danger" data-path='/{{object.tablename}}'
                                    data-method='DELETE'>Kill</button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <button @click="click" type="button" class="btn btn-default pull-right" data-path='/'
                            data-method='post' data-mode='edit'>New Table</button>
                    </td>
                </tr>
            </table>

        </template>

    </form>

</template>

<script>
    export default {

        name: 'View',

        props: [ 'table', 'row', 'click' ],

    }
</script>
