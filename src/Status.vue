<template>

    <div class="text-right">
        <samp class=" {{ (state) ? 'bg-'+state : 'fade' }}">{{ status }}</samp>
    </div>

</template>

<script>
    export default {

        name: 'Status',
        
        data: function() {
            return {
                state: '',
                status: '',
            }
        },

        events: {

            'state-update': function(state) {

                this.state = state;

                var clear_state = (function(){
                    this.state='';
                }).bind(this);

                if (this.fade)
                    clearTimeout(this.fade);

                if (state=='success')
                    this.fade = setTimeout(clear_state, 2000 );

            },

            'status-update': function(status) {

                this.status = status;

            }

        }

    }
</script>
