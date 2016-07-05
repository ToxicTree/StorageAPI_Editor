<template>

    <ol class="breadcrumb" id="apiNav">
        
        <template v-if="!table && !row">

            <li v-if="editMode">
                <a href='{{$root.nav}}' @click.prevent="click" data-path='/'>Root</a>
            </li>
            <li v-else>
                Root
            </li>

        </template>

        <template v-if="table && !row">

            <li>
                <a href='{{$root.nav}}' @click.prevent="click" data-path='/'>Root</a>
            </li>
            <li v-if="editMode">
                <a href='{{$root.nav}}' @click.prevent="click" data-path='/{{table}}' data-table='{{table}}'>{{table}}</a>
            </li>
            <li v-else>
                {{table}}
            </li>

        </template>

        <template v-if="table && row">

            <li>
                <a href='{{$root.nav}}' @click.prevent="click" data-path='/'>Root</a>
            </li>
            <li>
                <a href='{{$root.nav}}' @click.prevent="click" data-path='/{{table}}' data-table='{{table}}'>{{table}}</a>
            </li>
            <li v-if="editMode">
                <a href='{{$root.nav}}' @click.prevent="click" data-path='/{{table}}/{{row}}' data-table='{{table}}' data-row='{{row}}'>{{row}}</a>
            </li>
            <li v-else>
                {{row}}
            </li>

        </template>

        <template v-if="editMode">

            <li>Edit</li>

        </template>

    </ol>

</template>

<script>
    export default {

        name: 'Nav',
        
        props: [ 'table', 'row', 'edit-mode', 'click' ]

    }
</script>
