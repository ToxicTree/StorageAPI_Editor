<template>
    <ol class="breadcrumb" id="apiPath">/</ol>
</template>

<script>
    export default {
        events: {
            'nav-update': function(apiPath,table,row) {
                this.table = table;
                this.row = row;
                this.updateNav(apiPath);
            }
        },
        data() {
            return {
                table: '',
                row: null,
                apiPath: '/'
            }
        },
        methods: {
            updateNav(apiPath) {
                this.apiPath = apiPath;
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
                    self.$parent.navigate(
                        this.getAttribute('data-path'),
                        'GET',
                        '',
                        this.getAttribute('data-table'),
                        this.getAttribute('data-row')
                    )
                });
            }
        }
    }
</script>