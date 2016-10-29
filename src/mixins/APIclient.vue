<script>
    export default {
        name: 'APIclient',
        methods: {
            handleSuccess(response) {
                console.log(response)
                bus.$emit('state', "success" );
                bus.$emit('status',
                    "Got response from '"+STORAGEAPI_DOMAIN+"'. "
                    +response.status+" "+response.statusText
                );
                bus.$emit('buffer',response.data);
                this.loading = false;
            },
            handleError(response) {
                bus.$emit('state', "error" );
                bus.$emit('status',
                    "Error from '"+STORAGEAPI_DOMAIN+"'. "
                    +response.code
                );
                this.loading = false;
            },
            makeRequest(options) {
                bus.$emit('state', "waiting" );
                bus.$emit('status',
                    "Connecting to storage @ '"+STORAGEAPI_DOMAIN+"' ..."
                );
                this.loading = true;

                if (options.method == 'GET')
                    Vue.http.get(STORAGEAPI_DOMAIN+options.path).then(this.handleSuccess,this.handleError);

                if (options.method == 'DELETE')
                    Vue.http.delete(STORAGEAPI_DOMAIN+options.path).then(this.handleSuccess,this.handleError);

                if (options.method == 'PUT')
                    Vue.http.put(STORAGEAPI_DOMAIN+options.path,options.data).then( response => {
                        var table = response.data[0].tablename || false;
                        var row = response.data[0].id || false;
                        // When updating a table, redirect to show table
                        if (table)
                            bus.$emit('navigate', { path: '/'+table } );
                        // When updating a row, redirect to show row
                        if (row && this.table)
                            bus.$emit('navigate', { path: '/'+this.table+'/'+row } );
                    },this.handleError);

                if (options.method == 'POST')
                    Vue.http.post(STORAGEAPI_DOMAIN+options.path,options.data).then( response => {
                        var table = response.data[0].tablename || false;
                        var row = response.data[0].id || false;
                        // When adding a new table, redirect to edit table
                        if (table)
                            bus.$emit('navigate', { path: '/'+table, mode: 'edit' } );
                        // When adding a new row, redirect to edit row
                        if (row && this.table)
                            bus.$emit('navigate', { path: '/'+this.table+'/'+row, mode: 'edit' } );
                    },this.handleError);

            }
        },
        created(){
            bus.$on('http_call', (options) => this.makeRequest(options) );
        }
    }
</script>
