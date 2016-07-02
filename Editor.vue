<template>

    <form class="form-horizontal" id="editor">


        <template v-if="$parent.table && $parent.row">

            <div v-for="(index, value) in $parent.data[0]" class="form-group">
                <label class="col-sm-offset-1 col-sm-2 control-label" for="{{index}}">{{index}}</label>
                <div class="col-sm-7"><input class="form-control" name="{{index}}" v-model="value"></div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-7" id="actions">
                    <button type="button" class="btn" @click="click" data-path='/{{table}}/{{row}}'
                            data-table='{{table}}' data-row={{row}} data-mode=''>Cancel</button>

                    <button type="button" class="btn" @click="click" data-path='/{{table}}/{{row}}' data-method='PUT'
                            data-table='{{table}}' data-row={{row}} data-mode=''>Save</button>
                </div>
            </div>

        </template>

        <template v-if="$parent.table && !$parent.row">

            <table class="table">
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th class="text-right">Actions</th>
                    </tr>
                <tr v-for="(index, column) in $parent.data[0].columns">
                    <template v-if="!column.fresh">
                        <td>
                            <input class="form-control" name="{{column.name}}" v-model="column.name" :disabled="column.originalName=='id'">
                            <input class="hidden" name="{{column.originalName}}" v-model="column.originalName"></div>
                        </td>
                        <td>
                            <select name="{{column.type}}" v-model="column.type" class="form-control" :disabled="column.originalName=='id'">
                                <option v-for="type in types" value="{{type}}" :selected="type==column.type">{{type}}</option>
                            </select>
                            <!--div class="col-sm-10"><input class="form-control" name="{{column.type}}" v-model="column.type"></div-->
                            <input class="hidden" name="{{column.originalType}}" v-model="column.originalType"></div>
                        </td>
                        <td>
                            <button v-if="column.originalName!='id'" type="button" class="btn pull-right" @click="remove(index)">Remove</button>
                        </td>
                    </template>
                    <template v-else>
                        <td>
                            <input class="form-control" name="{{column.originalName}}" v-model="column.originalName">
                        </td>
                        <td>
                            <select name="{{column.originalType}}" v-model="column.originalType" class="form-control">
                                <option v-for="type in types" value="{{type}}" :selected="type==column.originalType">{{type}}</option>
                            </select>
                        </td>
                        <td>
                            <button type="button" class="btn pull-right" @click="remove(index)">Remove</button>
                        </td>
                    </template>
                </tr>
                <tr>
                    <td colspan="3">
                        <button type="button" class="btn pull-right" @click="add">Add</button>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <div class="btn-group pull-right">
                        <button type="button" class="btn" @click="click" data-path='/{{table}}'
                                data-table='{{table}}' data-mode=''>Cancel</button>

                        <button type="button" class="btn btn-primary" @click="click" data-path='/{{table}}' data-method='PUT'
                                data-table='{{table}}' data-mode=''>Save</button>
                        </div>
                    </td>
                </tr>
            </table>
            
        </template>

    </form>

</template>

<script>
    export default {
        props: [ 'table', 'row' ],
        data(){
            return {
                types: [ 'INTEGER', 'TEXT' ]
            }
        },
        methods: {
            submit(){
                return true;
            },
            remove(i){
                this.$parent.data[0].columns.splice(i,1);
            },
            add(){
                this.$parent.data[0].columns.push({fresh:true});
            },
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

<style>

</style>