module.exports = {
    apps : [{
        name        : "vue-strap-spc-docs",
        script      : "npm",
        args        : "run docs",
        watch       : false,
        instances   : "1",
        "exec_mode" : "cluster",
        "max_memory_restart" : "150M",
        env: {
            "NODE_ENV": "development",
        },
        env_production : {
            "NODE_ENV": "production"
        }
    }]
};

