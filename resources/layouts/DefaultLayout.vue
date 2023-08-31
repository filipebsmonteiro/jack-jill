<template>
    <div>
        <header>
            <slot name="header">
                <h1>Default Header</h1>
            </slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer">
                <h1>Default Footer</h1>
            </slot>
        </footer>
    </div>
</template>
