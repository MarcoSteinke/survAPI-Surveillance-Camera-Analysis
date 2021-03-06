class Camera {

    constructor(id, name, description, configuration) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.configuration = configuration;
    }

    getIp() {
        return this.configuration.ip;
    }

    getPort() {
        return this.configuration.port;
    }
}