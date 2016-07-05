<template>

    <div class="SqliteEditor__status">
        <samp class="{{ (state) ? 'bg-'+state : '--fade' }}">{{ status }}</samp>
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

                this.fade = setTimeout(clear_state, 2000 );

            },

            'status-update': function(status) {

                this.status = status;

            }

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
