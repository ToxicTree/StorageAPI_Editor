<template>
    <div v-if="row">

        <div v-for="(value, index) in row" class="form-group">
            <label class="col-sm-offset-2 col-sm-2 control-label"
                :for="index">
                {{index}}
            </label>
            <div class="col-sm-5">
                <input class="form-control" v-if="mode=='edit'"
                    :name="index"
                    v-model="row[index]"
                    :disabled="index=='id'">
                <span v-else>
                    {{value}}
                </span>
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-offset-4 col-sm-5">
                <div class="btn-group" v-if="mode=='edit'">
                    <button type="button" class="form_cancel" @click="nav({
                        path:'/'+table+'/'+row.id
                    })">Cancel</button>
                    <button type="button" class="form_save" @click="nav({
                        path:'/'+table+'/'+row.id,
                        method:'PUT',
                        data: row
                    })">Save</button>
                </div>
                <div class="btn-group" v-if="mode!='edit'">
                    <button type="button" class="form_edit" @click="nav({
                        path:'/'+table+'/'+row.id,
                        mode:'edit'
                    })">Edit</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'RowEditor',
        props: [ 'buffer', 'mode', 'table' ],
        data() { return { row: false } },
        methods: {
            nav(e) { bus.$emit('navigate',e) }
        },
        created(){ this.row = this.buffer[0]; }
    }
</script>
