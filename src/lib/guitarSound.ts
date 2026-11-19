/** A short plucked tone with a bright attack and a softer resonant tail. */
export function createGuitarSound() {
    const context = new AudioContext();
    const harmonics = new Float32Array([0, 1, 0.55, 0.23, 0.1, 0.14, 0.08, 0.04]);
    const wave = context.createPeriodicWave(new Float32Array(harmonics.length), harmonics);

    return {
        context,
        play(frequency: number) {
            if (context.state !== 'running') return;

            const now = context.currentTime;
            const source = context.createOscillator();
            const filter = context.createBiquadFilter();
            const envelope = context.createGain();
            source.setPeriodicWave(wave);
            source.frequency.value = frequency;
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(4600, now);
            filter.frequency.exponentialRampToValueAtTime(850, now + 0.45);
            envelope.gain.setValueAtTime(0, now);
            envelope.gain.linearRampToValueAtTime(0.075, now + 0.006);
            envelope.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);
            source.connect(filter).connect(envelope).connect(context.destination);
            source.onended = () => {
                source.disconnect();
                filter.disconnect();
                envelope.disconnect();
            };
            source.start(now);
            source.stop(now + 1.32);
        },
    };
}
