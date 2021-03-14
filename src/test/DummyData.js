module.exports = class DummyData {

    constructor(camera) {
        this.camera = camera;
    }

    async cameras() {

        await this.camera.create(
            {
              name: "Front Door",
              description: "Simple Front door camera",
              ip: "192.168.0.2",
              port: 37482,
              resolution: 720
            }
          );

          await this.camera.create(
            {
              name: "Kitchen",
              description: "If you want to know who steals your chocolate",
              ip: "192.168.0.2",
              port: 37482,
              resolution: 360 // bad resolution so actually you do not know who stole it :)
            }
          );

          await this.camera.create(
            {
              name: "Level 1 Elevator",
              description: "Camera directed at the doors in level 1",
              ip: "192.168.1.55",
              port: 37482,
              resolution: 480
            }
          );

          await this.camera.create(
            {
              name: "Level 2 Elevator",
              description: "Camera directed at the doors in level 2",
              ip: "192.168.2.55",
              port: 37482,
              resolution: 480
            }
          );

          

          
    }
}