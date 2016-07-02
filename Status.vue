<template>
    <div class="SqliteEditor__status">
        <samp class="{{ (state) ? 'bg-'+state : '--fade' }}">{{ status }}</samp>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                state: '',
                status: '',
            }
        },
        events: {
            'state-update': function(state) {
                this.updateState(state);
            },
            'status-update': function(status) {
                this.updateStatus(status);
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
            updateStatus(status) {
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