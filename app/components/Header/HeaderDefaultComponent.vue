<template>
    <header class="extended">
        <h1><span class="segment">Brain</span><span class="segment">in a</span><span class="segment">Bowl</span></h1>
        <div class="visual_container">!
        </div>
    </header>
</template>

<script setup>
</script>

<style lang="css" scoped>
    header {
        background-color: var(--col-bg);
        color: var(--col-fg);
        text-align: left;
    }
    header.extended {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        align-items: stretch;
    }
    header.extended h1 {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        padding: var(--padding);
        font-size: min(20vh, 10vw);
        line-height: 0.9;
    }
    header.extended .visual_container {
        display: block;
        width: 100%;
        margin: var(--padding);
        background-color: var(--col-fg);
    }

</style>