<template>
    <div>

        <status></status>

        <api-nav :table="table" :row="row" :edit-mode="editMode" :navigate="navigate"></api-nav>

        <view :table="table" :row="row" :navigate="navigate" v-if="!loading && !editMode && buffer.length<10" :buffer="buffer"></view>

        <editor :table="table" :row="row" :navigate="navigate" v-if="!loading && editMode && buffer.length<10" :buffer="buffer"></editor>
        
    </div>
</template>

<script>
    import Status from './Status.vue'
    import ApiNav from './ApiNav.vue'
    import Editor from './Editor.vue'
    import View from './View.vue'

    export default {

        name: 'StorageAPI_Editor',

        components: { Status, ApiNav, Editor, View },

        data: function() {
            return {
                buffer: '',
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

            navigate(e) {
                
                if (e && e.target) {

                    this.apiPath = e.target.getAttribute('data-path') || '/';

                    this.apiMethod = e.target.getAttribute('data-method') || 'GET';

                    this.editMode = e.target.getAttribute('data-mode') || '';

                    this.table = e.target.getAttribute('data-table') || '';

                    this.row = e.target.getAttribute('data-row') || 0;

                }

                if (this.apiMethod == 'POST' || this.apiMethod == 'PUT')
                    this.ajax(this.buffer[0]);

                else
                    this.ajax();

            },

            handleResponse(response) {

                this.buffer = response;

                if (this.apiMethod == 'POST' || this.apiMethod == 'PUT'){
                    this.table = this.buffer[0].tablename || this.table;
                    this.row = this.buffer[0].id || 0;
                }

                this.loading = false;

            },

            handleError() {

                if (this.apiMethod == 'PUT'){
                    this.editMode = 'edit';
                    this.table = this.buffer[0].tablename || this.table;
                    this.row = this.buffer[0].id || 0;
                }

                this.loading = false;

            },

            ajax(data) {

                var self = this;
                
                // Make a request
                self.$broadcast('status-update', "Connecting to storage @ '"+self.apiDomain+"' ...");
                self.$broadcast('state-update', 'waiting');
                self.loading = true;
                
                $.ajax({
                    url: self.apiDomain+self.apiPath,
                    async: true,
                    data: data,
                    type: self.apiMethod,
                    success: function(response,status,xhr){
                        self.$broadcast('state-update', 'success');
                        self.$broadcast('status-update', "Got response from '"+self.apiDomain+"'. "+xhr.status+" "+xhr.statusText);
                        self.handleResponse(response);
                    },
                    error: function(response,status,code){
                        self.$broadcast('state-update', 'danger');
                        self.$broadcast('status-update', "Error from '"+self.apiDomain+"'. "+code);
                        self.handleError();
                    }
                });

            }

        },

        ready: function() {
            this.navigate();
        }

    }
</script>
