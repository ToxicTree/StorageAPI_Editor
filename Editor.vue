<template>

    <form class="form-horizontal" id="editor">

        <template v-if="table && row">

            <div v-for="(index, value) in $parent.data[0]" class="form-group">
                <label class="col-sm-offset-2 col-sm-2 control-label" for="{{index}}">
                    {{index}}
                </label>
                <div class="col-sm-5">
                    <input class="form-control" name="{{index}}" v-model="value" :disabled="index=='id'">
                </div>
            </div>
            <div class="form-group" v-if="$parent.data[0].id">
                <div class="col-sm-offset-4 col-sm-5">
                    <div class="btn-group">
                        <button @click="click" type="button" class="btn btn-default" data-path='/{{table}}/{{$parent.data[0].id}}'
                                data-table='{{table}}' data-row={{$parent.data[0].id}}>Cancel</button>
                        <button @click="click" type="button" class="btn btn-primary" data-path='/{{table}}/{{$parent.data[0].id}}'
                                data-table='{{table}}' data-row={{$parent.data[0].id}} data-method='PUT'>Save</button>
                    </div>
                </div>
            </div>

        </template>

        <template v-if="table && !row">

            <div class="form-group">
                <label class="col-sm-offset-2 col-sm-2 control-label" for="{{index}}">
                    Tablename
                </label>
                <div class="col-sm-5">
                    <input class="form-control" name="{{$parent.data[0].tablename}}" v-model="$parent.data[0].tablename">
                    <input class="hidden" name="{{$parent.data[0].originalTablename}}" v-model="$parent.data[0].originalTablename"></div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-offset-2 col-sm-2 control-label" for="{{index}}">
                    Columns
                </label>
                <div class="col-sm-6">
                    <div v-for="(index, column) in $parent.data[0].columns" class="form-group">
                        <template v-if="!column.fresh">
                            <div class="col-sm-5">
                                <input class="form-control" name="{{column.name}}" v-model="column.name" :disabled="column.originalName=='id'">
                                <input class="hidden" name="{{column.originalName}}" v-model="column.originalName"></div>
                            </div>
                            <div class="col-sm-5">
                                <select name="{{column.type}}" v-model="column.type" class="form-control" :disabled="column.originalName=='id'">
                                    <option v-for="type in types" value="{{type}}" :selected="type==column.type">{{type}}</option>
                                </select>
                                <input class="hidden" name="{{column.originalType}}" v-model="column.originalType"></div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="col-sm-5">
                                <input class="form-control" name="{{column.originalName}}" v-model="column.originalName" :disabled="column.originalName=='id'">
                                <input class="hidden" name="{{column.originalName}}" v-model="column.originalName"></div>
                            </div>
                            <div class="col-sm-5">
                                <select name="{{column.originalType}}" v-model="column.originalType" class="form-control" :disabled="column.originalName=='id'">
                                    <option v-for="type in types" value="{{type}}" :selected="type==column.originalType">{{type}}</option>
                                </select>
                            </div>
                        </template>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger" @click="remove(index)">X</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-10 col-sm-2">
                            <button type="button" class="btn btn-default" @click="add">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-4 col-sm-5">
                    <div class="btn-group">
                        <button type="button" class="btn btn-default" @click="click" data-path='/{{table}}'
                                data-table='{{table}}' data-mode=''>Cancel</button>
                        <button type="button" class="btn btn-primary" @click="click" data-path='/{{table}}' data-method='PUT'
                                data-table='{{table}}' data-mode=''>Save</button>
                    </div>
                </div>
            </div>
            
        </template>

    </form>

</template>

<script>
    export default {

        name: 'Editor',
        
        props: [ 'table', 'row', 'click' ],

        data: function(){
            return {
                types: [ 'INTEGER', 'TEXT' ]
            }
        },

        methods: {

            remove(i){

                this.$parent.data[0].columns.splice(i,1);

            },

            add(){

                this.$parent.data[0].columns.push({fresh:true});

            }

        }

    }
</script>
