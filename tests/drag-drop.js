casper.start();
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');
casper.viewport(1024, 768);

casper.start('./tests/page/drag-drop.html');

casper.then(function(){
    this.capture('capture/step-1.jpg');
    this.mouse.down(200, 300);
    this.capture('capture/step-2.jpg');
    this.mouse.move(100, 100);
    this.capture('capture/step-3.jpg');
    this.mouse.up(100, 100);
    this.capture('capture/step-4.jpg');
});

casper.run();