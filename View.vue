<template>

    <form class="form-horizontal" id="view" v-if="buffer">

        <template v-if="table && row">

            <div v-for="(index, value) in buffer[0]" class="form-group">
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
                        <button @click="navigate" type="button" class="btn btn-default" data-path='/{{table}}'
                                data-table='{{table}}'>Back</button>
                        <button @click="navigate" type="button" class="btn btn-default" data-path='/{{table}}/{{row}}'
                                data-table='{{table}}' data-row='{{row}}' data-mode='edit'>Edit</button>
                        <button @click="navigate" type="button" class="btn btn-danger" data-path='/{{table}}/{{row}}'
                                data-table='{{table}}' data-method='DELETE'>Kill</button>
                    </div>
                </div>
            </div>

        </template>

        <template v-if="table && !row">

            <table class="table" >
                <tr>
                    <th v-for="column in buffer[0].columns">
                        <a @click.prevent="sortby" data-sortby="{{column.name}}">
                            {{column.name}}
                        </a>
                        <input v-if="column.name=='id'" type="checkbox" name="" value="0" v-model="selection[0]" @click="checkSetAll">
                    </th>
                    <th class="text-right">Tools</th>
                </tr>
                <tr v-for="object in buffer[0].data">
                    <td v-for="(index, value) in object">
                        <input v-if="index=='id'" type="checkbox" value="{{object.id}}" v-model="selection[object.id]" @change="checkSelection">
                        <a @click.prevent="navigate" v-if="index=='id'" href='{{$root.nav}}' data-path='/{{table}}/{{object.id}}'
                           data-table='{{table}}' data-row='{{object.id}}'>#{{object.id}}</a>
                        <p v-else>{{value && value.length>50 ? value.substring(0,50)+'...' : value}}</p>
                    </td>
                    <td>
                        <div class="btn-group pull-right">
                            <button @click="navigate" type="button" class="btn btn-default" data-path='/{{table}}/{{object.id}}'
                                    data-table='{{table}}' data-row='{{object.id}}' data-mode='edit'>Edit</button>
                            <button @click="navigate" type="button" class="btn btn-danger" data-path='/{{table}}/{{object.id}}'
                                    data-table='{{table}}' data-method='DELETE'>Kill</button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="{{buffer[0].columns.length+1}}">
                        <div class="btn-group pull-right">
                            <button @click="navigate" type="button" class="btn btn-default" data-path='/{{table}}'
                                    data-table='{{table}}' data-row='0' data-method='POST' data-mode='edit'>New Post</button>
                            <button @click="navigate" type="button" class="btn btn-default" data-path='/{{table}}'
                                    data-table='{{table}}' data-mode='edit'>Edit Table</button>
                            <button @click="batchDelete" type="button" class="btn btn-danger" data-path='/{{table}}'>Delete Selected</button>
                            <button @click="navigate" type="button" class="btn btn-danger" data-path='/{{table}}'
                                    data-method='DELETE'>Kill Table</button>
                        </div>
                    </td>
                </tr>
            </table>

        </template>

        <template v-if="!table && !row">

            <table class="table">
                <tr><th>Table</th><th>Columns</th><th class="text-right">Tools</th></tr>
                <tr v-for="object in buffer">
                    <td>
                        <a @click.prevent="navigate" href='{{$root.nav}}' data-path='/{{object.tablename}}'
                           data-table='{{object.tablename}}'>{{object.tablename}}</a>
                    </td>
                    <td><span v-for="(index, column) in object.columns">{{ (index>0) ? ', '+column.name : column.name }}</span></td>
                    <td>
                        <div class="btn-group pull-right">
                            <button @click="navigate" type="button" class="btn btn-default" data-path='/{{object.tablename}}'
                                    data-table='{{object.tablename}}' data-mode='edit'>Edit</button>
                            <button @click="navigate" type="button" class="btn btn-danger" data-path='/{{object.tablename}}'
                                    data-method='DELETE'>Kill</button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <div class="btn-group pull-right">
                            <button @click="navigate" type="button" class="btn btn-default" data-path='/'
                                data-method='POST' data-mode='edit'>New Table</button>
                            <button @click="navigate" type="button" class="btn btn-default" data-path='/yy/ii/uu'>Error</button>
                        </div>
                    </td>
                </tr>
            </table>

        </template>

    </form>

</template>

<script>
    export default {

        name: 'View',

        props: [ 'table', 'row', 'navigate', 'buffer' ],

        data: function(){
            return {
                sortingby: '',
                desc: false,
                selection: []
            }
        },

        methods: {

            checkSetAll(e){
                if (this.buffer[0] && this.buffer[0].data)
                    for (var i=0 ; i<this.buffer[0].data.length ; i++)
                        this.selection[this.buffer[0].data[i].id] = e.target.checked;
            },
            checkSelection() {
                setTimeout((function(){
                    var select = true;
                    if (this.buffer[0] && this.buffer[0].data)
                        for (var i=0 ; i<this.buffer[0].data.length ; i++)
                            if (this.selection[this.buffer[0].data[i].id] == false)
                                select = false;
                    this.selection[0] = select;
                }).bind(this),400);

            },

            batchDelete() {

                var id_string = '';

                for (var i=0 ; i<this.selection.length ; i++){
                    if (this.selection[i] == true){
                        if (id_string!='')
                            id_string += ',';
                        id_string += i;
                    }
                }

                this.$parent.apiPath = '/' + this.table + '/' + id_string;

                this.$parent.apiMethod = 'DELETE';

                this.navigate();
            },

            sortby(e) {

                var property = e.target.getAttribute('data-sortby');
                var desc = false;

                if (this.sortingby == property)
                    this.desc = desc = !this.desc;

                this.sortingby = property;

                if (typeof property == 'number')
                    this.buffer[0].data.sort(function(a, b){
                        if (!desc)
                            return a[property]-b[property];
                        else
                            return b[property]-a[property];
                    });
                else if (typeof property == 'string')
                    this.buffer[0].data.sort(function(a, b){
                        if (!desc)
                            return (a[property] > b[property]) ? -1 : 1;
                        else
                            return (a[property] < b[property]) ? -1 : 1;
                    });
            }

        },

        created: function(){
            this.selection = [];
        }

    }
</script>
