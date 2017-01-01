function sync(fn) {
    return fn();
}

try {
    sync(null);
    // do something
} catch (err) {
    console.log('Error: %s', err.message);
}

