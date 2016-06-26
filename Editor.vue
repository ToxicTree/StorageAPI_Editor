<template>
    <div class="SqliteEditor__status">
        <samp class="{{ (state) ? 'bg-'+state : '--fade' }}">{{ status }}</samp>
    </div>
    <ol class="breadcrumb" id="apiPath">/</ol>
    <div id="view"></div>
</template>

<script>
    export default {
        data() {
            return {
                status: '',
                state: '',
                editMode: '',
                table: '',
                row: 0,
                apiDomain: 'http://StorageAPI.dev',
                apiPath: '/',
                apiMethod: 'GET'
            }
        },
        methods: {
            updateState(state) {
                this.state = state;

                if (this.fade)
                    clearTimeout(this.fade);

                this.fade = setTimeout( (function(){
                    this.state='';
                }).bind(this), 2000 );
            },
            updateNav() {
                var content = "";
                var h = '', hierarchy = this.apiPath.split('/');

                if (this.row){
                    content += "<li><a href='"+this.$root.nav+"' data-path='/'               data-table=''               >Root</a></li>";
                    content += "<li><a href='"+this.$root.nav+"' data-path='/"+this.table+"' data-table='"+this.table+"' >"+this.table+"</a></li>";
                    content += "<li class='active'>"+this.row+"</li>";
                } else if (this.table){
                    content += "<li><a href='"+this.$root.nav+"' data-path='/'               data-table=''               >Root</a></li>";
                    content += "<li class='active'>"+this.table+"</li>";
                } else {
                    content += "<li class='active'>Root</li>";
                }

                content += "<li class='pull-right'><a data-path='"+this.apiPath+"' ";
                if (this.table)
                    content += "data-table='"+this.table+"' ";
                if (this.row)
                    content += "data-row="+this.row;
                content +=">reload</a></li>";

                $('#apiPath').html(content);

                var self = this;

                $('#apiPath a').click(function(){
                    console.log(this.getAttribute('data-table'))
                    self.navigate(
                        this.getAttribute('data-path'),
                        'GET',
                        '',
                        this.getAttribute('data-table'),
                        this.getAttribute('data-row')
                    )
                });
            },
            navigate(path, method, mode, table, row) {
                if (!path)
                    return;

                this.apiPath = path;

                this.apiMethod = (method) ? method : 'GET';

                this.editMode = (mode) ? mode : '';

                this.table = table;
                this.row = row;

                var data = false;
                if (this.apiMethod == 'PUT'){
                    data = {};
                    $('input').each(function(){
                        data[ this.getAttribute('name') ] = this.value;
                    })
                    console.log(data)
                }

                this.ajax(this.handleResponse,data);

                this.updateNav();
            },
            prepDB(data){
                var content = "<table class='table'>";

                content += "<tr><th>Table</th><th>Columns</th><th>Tools</th></tr>";

                for (var tableName in data) {
                    content += "<tr>";
                    content += " <td><a href='"+this.$root.nav+"' data-path='/"+tableName+"' data-table='"+tableName+"'>"+tableName+"</a></td>";
                    content += " <td>";
                    for (var i=0 ; i<data[tableName].length ; i++)
                        content += data[tableName][i]+" ";
                    content += " </td>";
                    content += " <td><a href='"+this.$root.nav+"' data-path='/"+tableName+"/info' data-table='"+tableName+"' data-mode='edit'>Edit</a></td>";
                    content += "</tr>";
                }

                content += "</table>";

                return content;
            },
            prepTable(data){
                var content = "";

                if (this.editMode) {
                    content += "<table class='table'>";

                    content += "<tr>";
                    content += " <td>Tablename:</td>";
                    content += " <td><input class='form-control' name="+data.tablename+" value='"+data.tablename+"'></td>";
                    content += "</tr>";

                    for (var i=0 ; i<data.columns.length ; i++){
                        content += "<tr>";
                        content += " <td>"+data.columns[i].name+":</td>";
                        content += " <td><input class='form-control' name="+data.columns[i].name+" value='"+data.columns[i].type+"'></td>";
                        content += "</tr>";
                    }
                    
                    content += "<tr>";
                    content += " <td>Tools:</td>";
                    content += " <td>";
                    content += "  <a href='"+this.$root.nav+"' data-path='/'>Cancel</a>";
                    content += "  <a href='"+this.$root.nav+"' data-path='/"+this.table+"' data-table='"+this.table+"' data-method='PUT'>Save</a>";
                    content += " </td>";
                    content += "</tr>";
                    
                    content += "</table>";
                }
                else {
                    content += "<table class='table'>";

                    content += "<tr>";
                    for (var key in data[0])
                        content += " <th>"+key+"</th>";
                    content += " <th>Tools</th>";
                    content += "</tr>";

                    for (var i=0; i<data.length ; i++){
                        content += "<tr>";
                        for (var key in data[i]){
                            if (key=="id")
                                content += " <td><a href='"+this.$root.nav+"' data-path='"+this.apiPath+'/'+data[i].id+"' data-table='"+this.table+"' data-row="+data[i].id+">"+data[i].id+"</a></td>";
                            else
                                content += " <td>"+data[i][key]+"</td>";
                        }
                        content += " <td>";
                        content += "  <a href='"+this.$root.nav+"' data-path='"+this.apiPath+'/'+data[i].id+"' data-table='"+this.table+"' data-method='DELETE'>KILL</a>";
                        content += "  <a href='"+this.$root.nav+"' data-path='"+this.apiPath+'/'+data[i].id+"' data-table='"+this.table+"' data-row="+data[i].id+" data-mode='edit'>Edit</a>";
                        content += " </td>";
                        content += "</tr>";
                    }

                    content += "</table>";
                }
                return content;
            },
            prepPost(data){
                var content = "";

                if (this.editMode) {
                    content += "<table class='table'>";

                    for (var key in data[0]){
                        content += "<tr>";
                        content += " <td>"+key+"</td>";
                        content += " <td><input class='form-control' name="+key+" value='"+data[0][key]+"'></td>";
                        content += "</tr>";
                    }
                    
                    content += "<tr>";
                    content += " <td>Tools:</td>";
                    content += " <td>";
                    content += "  <a href='"+this.$root.nav+"' data-path='/"+this.table+"' data-table='"+this.table+"'>Cancel</a>";
                    content += "  <a href='"+this.$root.nav+"' data-path='"+this.apiPath+"' data-table='"+this.table+"' data-row="+this.row+" data-method='PUT'>Save</a>";
                    content += " </td>";
                    content += "</tr>";
                    
                    content += "</table>";
                }
                else {
                    content += "<table class='table'>";

                    for (var key in data[0]){
                        content += "<tr>";
                        content += " <td>"+key+"</td>";
                        content += " <td>"+data[0][key]+"</td>";
                        content += "</tr>";
                    }
                    
                    content += "<tr>";
                    content += " <td>Tools:</td>";
                    content += " <td>";
                    content += "  <a href='"+this.$root.nav+"' data-path='"+this.apiPath+"' data-table='"+this.table+"' data-method='DELETE'>KILL</a>";
                    content += "  <a href='"+this.$root.nav+"' data-path='"+this.apiPath+"' data-table='"+this.table+"' data-row="+this.row+" data-mode='edit'>Edit</a>";
                    content += " </td>";
                    content += "</tr>";
                    
                    content += "</table>";
                }
                return content;
            },
            handleResponse(data){
                var self = this;

                var content = 
                    (this.row) ? this.prepPost(data) :
                    (this.table) ? this.prepTable(data) :
                    (this.apiPath=='/') ? this.prepDB(data) : false;

                if (!content)
                    return;

                $('#view').html(content);

                $('#view a').click(function(){
                    self.navigate(
                        this.getAttribute('data-path'),
                        this.getAttribute('data-method'),
                        this.getAttribute('data-mode'),
                        this.getAttribute('data-table'),
                        this.getAttribute('data-row')
                    );
                });
            },
            ajax(cb,data){
                var self = this;
                
                // Make a request
                self.status = "Connecting to storage @ '"+self.apiDomain+"' ...";

                $.ajax({
                    url: self.apiDomain+self.apiPath,
                    async: true,
                    data: data,
                    type: self.apiMethod,
                    success: function(response,status,xhr){
                        self.updateState('success');

                        self.status  = "Got response from '"+self.apiDomain+"'. "+xhr.status+" "+xhr.statusText;
                        cb(response);
                    },
                    error: function(response,status,code){
                        self.updateState('danger');

                        self.status  = "Error from '"+self.apiDomain+"'. "+code;
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
    .SqliteEditor__status {
        text-align: right;
    }

    .--fade {
        transition: all 1s ease-out;
    }
</style>