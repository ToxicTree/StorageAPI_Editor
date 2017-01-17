<template>
    <ol id="nav">

        <li v-if="table || mode=='edit'">
            <a role="button" @click.prevent="navigate">Root</a>
        </li>
        <li v-else>
            Root
        </li>

        <li v-if="table && mode=='edit' || row">
            <a role="button" @click.prevent="navigate({
                path: '/'+table
            })">{{table}}</a>
        </li>
        <li v-if="table && !row && mode!='edit'">
            {{table}}
        </li>

        <li v-if="row && mode=='edit'">
            <a role="button" @click.prevent="navigate({
                path: '/'+table+'/'+row
            })">{{row}}</a>
        </li>
        <li v-if="row && mode!='edit'">
            {{row}}
        </li>

        <li v-if="mode=='edit'">Edit</li>

        <li>
            <a role="button" @click.prevent="navigate({
                path: '/' + ((table) ? table : '') + ((row) ? '/'+row : '')
            })">Reload</a>
        </li>

    </ol>
</template>

<script>
    module.exports = {
        name: 'Navigation',
        props: [ 'mode', 'table', 'row' ],
        methods: {
            navigate(e){
                // Validate argument
                if (typeof e != 'object')
                    e = {};

                // Parse some properties from the path
                var path = (e && typeof e.path == 'string') ? e.path : '/';
                var table = path.split('/')[1] || '';
                var row = path.split('/')[2] || 0;

                // If removing, go up
                if (e.method=='DELETE') {
                    if (row!=0)
                        bus.$emit('row', 0 );
                    else if (table!='')
                        bus.$emit('table', '' );
                    bus.$emit('mode', '' );
                }

                // Else, proceed as normal
                else {
                    bus.$emit('table', table );
                    bus.$emit('row', row );
                    bus.$emit('mode', e.mode || '' );
                }

                // Forward the options
                bus.$emit('http_call',{
                    path: path,
                    method: e.method || 'GET',
                    data: e.data || []
                });
            }
        },
        created(){
            bus.$on('navigate', (e) => this.navigate(e) );
            this.navigate();
        }
    }
</script>
