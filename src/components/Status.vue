<template>
    <div id="status">
        <samp :class="(!hidden) ? state : 'off'">{{ status }}</samp>
    </div>
</template>

<script>
    export default {
        name: 'Status',
        data(){
            return {
                state: '',
                status: '',
                hidden: false
            };
        },
        watch: {
            // Toggle visibillity when state changes
            'state' : function(n){
                this.hidden = false;

                if (this.fade)
                    clearTimeout(this.fade);

                if (n=='success')
                    this.fade = setTimeout( () => this.hidden = true , 2000 );
            }
        },
        created(){
            bus.$on('state',(state)=>this.state=state);
            bus.$on('status',(status)=>this.status=status);
        }
    }
</script>
