<template>

    <ol class="breadcrumb" id="apiNav">
        
        <template v-if="!table && !row">

            <template v-if="editMode">

                <li><a href='{{$root.nav}}' @click.prevent="navigate" data-path='/'>Root</a></li>
                <li>Edit</li>

            </template>
            <template v-else>

                <li>Root</li>

            </template>

            <li class="pull-right"><a href='{{$root.nav}}' @click.prevent="navigate" data-path='/' data-mode="{{editMode}}"
                                      >Reload</a></li>

        </template>

        <template v-if="table && !row">

            <li><a href='{{$root.nav}}' @click.prevent="navigate" data-path='/'>Root</a></li>
            
            <template v-if="editMode">

                <li><a href='{{$root.nav}}' @click.prevent="navigate" data-path='/{{table}}' data-table='{{table}}'>{{table}}</a></li>
                <li>Edit</li>

            </template>
            <template v-else>

                <li>{{table}}</li>

            </template>

            <li class="pull-right"><a href='{{$root.nav}}' @click.prevent="navigate" data-path='/{{table}}' data-mode="{{editMode}}"
                                      data-table='{{table}}'>Reload</a></li>

        </template>

        <template v-if="table && row">

            <li><a href='{{$root.nav}}' @click.prevent="navigate" data-path='/'>Root</a></li>
            <li><a href='{{$root.nav}}' @click.prevent="navigate" data-path='/{{table}}' data-table='{{table}}'>{{table}}</a></li>
            
            <template v-if="editMode">

                <li><a href='{{$root.nav}}' @click.prevent="navigate" data-path='/{{table}}/{{row}}' data-table='{{table}}' data-row='{{row}}'>{{row}}</a></li>
                <li>Edit</li>

            </template>
            <template v-else>

                <li>{{row}}</li>

            </template>

            <li class="pull-right"><a href='{{$root.nav}}' @click.prevent="navigate" data-path='/{{table}}/{{row}}' data-mode="{{editMode}}"
                                      data-table='{{table}}' data-row='{{row}}'>Reload</a></li>

        </template>

    </ol>

</template>

<script>
    export default {

        name: 'Nav',
        
        props: [ 'table', 'row', 'edit-mode', 'navigate' ]

    }
</script>
