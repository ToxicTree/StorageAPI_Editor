<template>
    <div>
        <table class="table table-default" v-if="buffer && mode!='edit'">
            <thead>
                <tr>
                    <th v-for="column in buffer[0].columns">
                        <!-- <input v-if="column.name=='id'" type="checkbox" name=""
                            value="0" v-model="selection[0]" @click="checkSetAll"> -->
                        {{column.name}}
                    </th>
                    <th class="text-right">Tools</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="object in buffer[0].data">
                    <td v-for="(value, index) in object">
                        <!-- <input v-if="index=='id'" type="checkbox"
                            :value="object.id" v-model="selection[object.id]"
                            @change="checkSelection"> -->
                        <a v-if="index=='id'" role="button" @click.prevent="nav({
                            path:'/'+buffer[0].tablename+'/'+object.id,
                        })">#{{object.id}}</a>
                        <p v-else>{{value && value.length>50 ? value.substring(0,50)+'...' : value}}</p>
                    </td>
                    <td>
                        <button type="button" class="table_edit" @click="nav({
                            path:'/'+buffer[0].tablename+'/'+object.id,
                            mode:'edit'
                        })"></button>
                        <button type="button" class="table_delete" @click="nav({
                            path:'/'+buffer[0].tablename+'/'+object.id,
                            method:'DELETE'
                        })"></button>
                    </td>
                </tr>
                <tr>
                    <td :colspan="buffer[0].columns.length+1">
                        <div class="btn-group">
                            <!-- <button type="button" class="row_delete_b"
                                @click="batchDelete"></button> -->
                            <button type="button" class="table_new" @click="nav({
                                path:'/'+buffer[0].tablename,
                                method:'POST'
                            })"> Row</button>
                        </div>
                        <div class="btn-group">
                            <button type="button" class="table_edit" @click="nav({
                                path:'/'+buffer[0].tablename,
                                mode:'edit'
                            })"> Table</button>
                            <button type="button" class="table_delete" @click="nav({
                                path:'/'+buffer[0].tablename,
                                method:'DELETE'
                            })"> Table</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <template v-if="table">
            <div class="form-group row">
                <label class="col-sm-offset-2 col-sm-2 control-label"
                    :for="table.tablename">
                    Tablename
                </label>
                <div class="col-sm-5">
                    <input class="form-control"
                        :name="table.tablename"
                        v-model="table.tablename">
                    <input class="hidden"
                        :name="table.originalTablename"
                        v-model="table.originalTablename">
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-offset-2 col-sm-2 control-label">
                    Columns
                </label>
                <div class="col-sm-6">
                    <div v-for="(column, index) in table.columns" class="form-group row">
                        <template v-if="!column.fresh">
                            <div class="col-sm-5">
                                <input class="form-control" :name="column.name" v-model="column.name" :disabled="column.originalName=='id'">
                                <input class="hidden" :name="column.originalName" v-model="column.originalName">
                            </div>
                            <div class="col-sm-5">
                                <select :name="column.type" v-model="column.type" class="form-control" :disabled="column.originalName=='id'">
                                    <option v-for="type in types" :value="type" :selected="type==column.type">{{type}}</option>
                                </select>
                                <input class="hidden" :name="column.originalType" v-model="column.originalType">
                            </div>
                        </template>
                        <template v-else>
                            <div class="col-sm-5">
                                <input class="form-control" :name="column.originalName" v-model="column.originalName" :disabled="column.originalName=='id'">
                                <input class="hidden" :name="column.originalName" v-model="column.originalName">
                            </div>
                            <div class="col-sm-5">
                                <select :name="column.originalType" v-model="column.originalType" class="form-control" :disabled="column.originalName=='id'">
                                    <option v-for="type in types" :value="type" :selected="type==column.originalType">{{type}}</option>
                                </select>
                            </div>
                        </template>
                        <div class="col-sm-2">
                            <button type="button" class="table_delete" @click="removeColumn(index)"></button>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-offset-10 col-sm-2">
                            <button type="button" class="table_new" @click="addColumn"></button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <div class="col-sm-offset-4 col-sm-5">
                    <div class="btn-group">
                        <button type="button" class="form_cancel" @click="nav({
                                path:'/'+table.originalTablename
                        })">Cancel</button>
                        <button type="button" class="form_save" @click="nav({
                                path:'/'+table.originalTablename,
                                method:'PUT',
                                data: table
                        })">Save</button>
                    </div>
                </div>
            </div>

        </template>

    </div>
</template>

<script>
    module.exports = {
        name: 'TableEditor',
        props: [ 'buffer', 'mode' ],
        data(){ return { table: false, types: [ 'INTEGER', 'TEXT' ] } },
        methods: {
            nav(e) { bus.$emit('navigate',e) },
            removeColumn(i){
                this.table.columns.splice(i,1);
            },
            addColumn(){
                this.table.columns.push({fresh:true});
            }
        },
        created(){ if (this.mode=='edit') this.table = this.buffer[0]; }
    }
</script>
