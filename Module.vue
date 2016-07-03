<template>
    <status></status>
    <api-nav></api-nav>
    <view :table="table" :row="row" v-if="!loading && !editMode"></view>
    <editor :table="table" :row="row" v-if="!loading && editMode"></editor>
</template>

<script>
    import Status from './Status.vue'
    import ApiNav from './ApiNav.vue'
    import Editor from './Editor.vue'
    import View from './View.vue'

    export default {
        components: {
            Status,
            ApiNav,
            Editor,
            View
        },
        data() {
            return {
                data: '',
                loading: false,

                editMode: '',

                table: '',
                row: null,

                apiDomain: 'http://StorageAPI.dev',
                apiPath: '/',
                apiMethod: 'GET'
            }
        },

        methods: {
            navigate(apiPath, apiMethod, editMode, table, row) {
                if (!apiPath)
                    return;

                this.apiPath = apiPath;

                this.apiMethod = (apiMethod) ? apiMethod : 'GET';

                this.editMode = (editMode) ? editMode : '';

                this.table = table;
                this.row = row;

                this.ajax(this.handleResponse,this.data[0]);

                this.$broadcast('nav-update', apiPath, table, row);
            },
            handleResponse(data){
                var self = this;

                this.data = data;

                this.$broadcast('refresh-contents');

                this.loading = false;
            },
            ajax(cb,data){
                var self = this;
                
                // Make a request
                self.$broadcast('status-update', "Connecting to storage @ '"+self.apiDomain+"' ...");
                self.loading = true;
                
                $.ajax({
                    url: self.apiDomain+self.apiPath,
                    async: true,
                    data: data,
                    type: self.apiMethod,
                    success: function(response,status,xhr){
                        self.$broadcast('state-update', 'success');
                        self.$broadcast('status-update', "Got response from '"+self.apiDomain+"'. "+xhr.status+" "+xhr.statusText);
                        cb(response);
                    },
                    error: function(response,status,code){
                        self.$broadcast('state-update', 'danger');
                        self.$broadcast('status-update', "Error from '"+self.apiDomain+"'. "+code);
                    }
                });
            }
        },
        ready(){
            this.navigate(
                this.apiPath,
                'GET',
                '',
                '',
                0
            );
        }
    }
</script>

<style>

</style>