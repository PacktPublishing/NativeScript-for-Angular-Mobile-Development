
declare class AK3DPanner extends AKNode {

	static alloc(): AK3DPanner; // inherited from NSObject

	static new(): AK3DPanner; // inherited from NSObject

	x: number;

	y: number;

	z: number;

	constructor(o: { x: AKNode; y: number; z: number; });

	initXYZ(input: AKNode, x: number, y: number, z: number): this;
}

declare class AKADSRView extends UIView {

	static alloc(): AKADSRView; // inherited from NSObject

	static appearance(): AKADSRView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKADSRView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKADSRView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKADSRView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKADSRView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKADSRView; // inherited from UIAppearance

	static new(): AKADSRView; // inherited from NSObject

	static requiresConstraintBasedLayout(): boolean;

	attackColor: UIColor;

	attackDuration: number;

	callback: (p1: number, p2: number, p3: number, p4: number) => void;

	curveColor: UIColor;

	curveStrokeWidth: number;

	decayColor: UIColor;

	decayDuration: number;

	releaseColor: UIColor;

	releaseDuration: number;

	sustainColor: UIColor;

	sustainLevel: number;

	constructor(o: { callback: (p1: number, p2: number, p3: number, p4: number) => void; });

	initWithCallback(callback: (p1: number, p2: number, p3: number, p4: number) => void): this;
}

declare class AKAmplitudeEnvelope extends AKNode {

	static alloc(): AKAmplitudeEnvelope; // inherited from NSObject

	static new(): AKAmplitudeEnvelope; // inherited from NSObject

	attackDuration: number;

	decayDuration: number;

	readonly isStarted: boolean;

	rampTime: number;

	releaseDuration: number;

	sustainLevel: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { attackDuration: AKNode; decayDuration: number; sustainLevel: number; releaseDuration: number; });

	initAttackDurationDecayDurationSustainLevelReleaseDuration(input: AKNode, attackDuration: number, decayDuration: number, sustainLevel: number, releaseDuration: number): this;

	start(): void;

	stop(): void;
}

declare class AKAmplitudeEnvelopeAudioUnit extends AKAudioUnit {

	static alloc(): AKAmplitudeEnvelopeAudioUnit; // inherited from NSObject

	static new(): AKAmplitudeEnvelopeAudioUnit; // inherited from NSObject

	attackDuration: number;

	decayDuration: number;

	releaseDuration: number;

	sustainLevel: number;
}

declare class AKAmplitudeTracker extends AKNode {

	static alloc(): AKAmplitudeTracker; // inherited from NSObject

	static new(): AKAmplitudeTracker; // inherited from NSObject

	readonly amplitude: number;

	halfPowerPoint: number;

	readonly isStarted: boolean;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { halfPowerPoint: AKNode; });

	initHalfPowerPoint(input: AKNode, halfPowerPoint: number): this;

	start(): void;

	stop(): void;
}

declare class AKAmplitudeTrackerAudioUnit extends AKAudioUnit {

	static alloc(): AKAmplitudeTrackerAudioUnit; // inherited from NSObject

	static new(): AKAmplitudeTrackerAudioUnit; // inherited from NSObject

	readonly amplitude: number;
}

declare class AKAudioFile extends AVAudioFile {

	static alloc(): AKAudioFile; // inherited from NSObject

	static createFileWithDirFileWriteError(dir: BaseDirectory, path: string, write: boolean): string;

	static new(): AKAudioFile; // inherited from NSObject

	static silentWithSamplesBaseDirNameError(samples: number, baseDir: BaseDirectory, name: string): AKAudioFile;

	static stringUTIWithType(type: ExportFormat): string;

	readonly avAsset: AVURLAsset;

	floatChannelData: NSArray<NSArray<number>>;

	maxLevel: number;

	readonly midiSampler: AKMIDISampler;

	pcmBuffer: AVAudioPCMBuffer;

	readonly player: AKAudioPlayer;

	readonly sampler: AKSampler;

	static readonly completedAsyncProcessesCount: number;

	static readonly queuedAsyncProcessCount: number;

	static readonly scheduledAsyncProcessesCount: number;

	static readonly supportedFileExtensions: NSArray<string>;

	constructor(o: { fromAVAudioPCMBuffer: AVAudioPCMBuffer; baseDir: BaseDirectory; name: string; });

	constructor(o: { createFileFromFloats: NSArray<NSArray<number>>; baseDir: BaseDirectory; name: string; });

	constructor(o: { readFileName: string; baseDir: BaseDirectory; });

	constructor(o: { writeIn: BaseDirectory; name: string; settings: NSDictionary<string, any>; });

	appendAsynchronouslyWithFileBaseDirNameCompletionHandler(file: AKAudioFile, baseDir: BaseDirectory, name: string, completionHandler: (p1: AKAudioFile, p2: NSError) => void): void;

	appendedByFileBaseDirNameError(file: AKAudioFile, baseDir: BaseDirectory, name: string): AKAudioFile;

	exportAsynchronouslyWithNameBaseDirExportFormatFromSampleToSampleCallback(name: string, baseDir: BaseDirectory, exportFormat: ExportFormat, fromSample: number, toSample: number, callback: (p1: AKAudioFile, p2: NSError) => void): void;

	extractAsynchronouslyFromSampleToSampleBaseDirNameCompletionHandler(fromSample: number, toSample: number, baseDir: BaseDirectory, name: string, completionHandler: (p1: AKAudioFile, p2: NSError) => void): void;

	extractedFromSampleToSampleBaseDirNameError(fromSample: number, toSample: number, baseDir: BaseDirectory, name: string): AKAudioFile;

	initFromAVAudioPCMBufferBaseDirNameError(buffer: AVAudioPCMBuffer, baseDir: BaseDirectory, name: string): this;

	initWithCreateFileFromFloatsBaseDirNameError(floatsArrays: NSArray<NSArray<number>>, baseDir: BaseDirectory, name: string): this;

	initWithReadFileNameBaseDirError(name: string, baseDir: BaseDirectory): this;

	initWithWriteInNameSettingsError(baseDir: BaseDirectory, name: string, settings: NSDictionary<string, any>): this;

	normalizeAsynchronouslyWithBaseDirNameNewMaxLevelCompletionHandler(baseDir: BaseDirectory, name: string, newMaxLevel: number, completionHandler: (p1: AKAudioFile, p2: NSError) => void): void;

	normalizedWithBaseDirNameNewMaxLevelError(baseDir: BaseDirectory, name: string, newMaxLevel: number): AKAudioFile;

	reverseAsynchronouslyWithBaseDirNameCompletionHandler(baseDir: BaseDirectory, name: string, completionHandler: (p1: AKAudioFile, p2: NSError) => void): void;

	reversedWithBaseDirNameError(baseDir: BaseDirectory, name: string): AKAudioFile;
}

declare class AKAudioPlayer extends AKNode {

	static alloc(): AKAudioPlayer; // inherited from NSObject

	static new(): AKAudioPlayer; // inherited from NSObject

	static secondsToAVAudioTimeWithHostTimeTime(hostTime: number, time: number): AVAudioTime;

	readonly audioFile: AKAudioFile;

	audioFileBuffer: AVAudioPCMBuffer;

	completionHandler: () => void;

	readonly currentTime: number;

	readonly duration: number;

	endTime: number;

	readonly isStarted: boolean;

	looping: boolean;

	pan: number;

	readonly path: string;

	readonly playhead: number;

	reversed: boolean;

	scheduledAVTime: AVAudioTime;

	scheduledTime: number;

	startTime: number;

	volume: number;

	constructor(o: { file: AKAudioFile; looping: boolean; error: interop.Pointer | interop.Reference<NSError>; completionHandler: () => void; });

	initWithFileLoopingErrorCompletionHandler(file: AKAudioFile, looping: boolean, error: interop.Pointer | interop.Reference<NSError>, completionHandler: () => void): this;

	pause(): void;

	playFromToAvTime(time: number, endTime: number, avTime: AVAudioTime): void;

	playFromToWhen(startTime: number, endTime: number, scheduledTime: number): void;

	reloadFileAndReturnError(): boolean;

	replaceWithFileError(file: AKAudioFile): boolean;

	resume(): void;

	start(): void;

	stop(): void;

	stopAtNextLoopEnd(): void;
}

declare class AKAudioUnit extends AUAudioUnit implements AKKernelUnit {

	static alloc(): AKAudioUnit; // inherited from NSObject

	static new(): AKAudioUnit; // inherited from NSObject

	defaultFormat: AVAudioFormat;

	inputBusArray: AUAudioUnitBusArray;

	outputBus: AUAudioUnitBus;

	rampTime: number;

	getter(): (p1: AUParameter) => number;

	isPlaying(): boolean;

	isSetUp(): boolean;

	setter(): (p1: AUParameter, p2: number) => void;

	start(): void;

	stop(): void;
}

declare class AKAutoWah extends AKNode {

	static alloc(): AKAutoWah; // inherited from NSObject

	static new(): AKAutoWah; // inherited from NSObject

	amplitude: number;

	readonly isStarted: boolean;

	mix: number;

	rampTime: number;

	wah: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { wah: AKNode; mix: number; amplitude: number; });

	initWahMixAmplitude(input: AKNode, wah: number, mix: number, amplitude: number): this;

	start(): void;

	stop(): void;
}

declare class AKAutoWahAudioUnit extends AKAudioUnit {

	static alloc(): AKAutoWahAudioUnit; // inherited from NSObject

	static new(): AKAutoWahAudioUnit; // inherited from NSObject

	amplitude: number;

	mix: number;

	wah: number;
}

declare class AKBalancer extends AKNode {

	static alloc(): AKBalancer; // inherited from NSObject

	static new(): AKBalancer; // inherited from NSObject

	readonly isStarted: boolean;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { comparator: AKNode; });

	initComparator(input: AKNode, comparator: AKNode): this;

	start(): void;

	stop(): void;
}

declare class AKBalancerAudioUnit extends AUAudioUnit {

	static alloc(): AKBalancerAudioUnit; // inherited from NSObject

	static new(): AKBalancerAudioUnit; // inherited from NSObject

	isPlaying(): boolean;

	start(): void;

	stop(): void;
}

declare class AKBandPassButterworthFilter extends AKNode {

	static alloc(): AKBandPassButterworthFilter; // inherited from NSObject

	static new(): AKBandPassButterworthFilter; // inherited from NSObject

	bandwidth: number;

	centerFrequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { centerFrequency: AKNode; bandwidth: number; });

	initCenterFrequencyBandwidth(input: AKNode, centerFrequency: number, bandwidth: number): this;

	start(): void;

	stop(): void;
}

declare class AKBandPassButterworthFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKBandPassButterworthFilterAudioUnit; // inherited from NSObject

	static new(): AKBandPassButterworthFilterAudioUnit; // inherited from NSObject

	bandwidth: number;

	centerFrequency: number;
}

declare class AKBandRejectButterworthFilter extends AKNode {

	static alloc(): AKBandRejectButterworthFilter; // inherited from NSObject

	static new(): AKBandRejectButterworthFilter; // inherited from NSObject

	bandwidth: number;

	centerFrequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { centerFrequency: AKNode; bandwidth: number; });

	initCenterFrequencyBandwidth(input: AKNode, centerFrequency: number, bandwidth: number): this;

	start(): void;

	stop(): void;
}

declare class AKBandRejectButterworthFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKBandRejectButterworthFilterAudioUnit; // inherited from NSObject

	static new(): AKBandRejectButterworthFilterAudioUnit; // inherited from NSObject

	bandwidth: number;

	centerFrequency: number;
}

declare class AKBitCrusher extends AKNode {

	static alloc(): AKBitCrusher; // inherited from NSObject

	static new(): AKBitCrusher; // inherited from NSObject

	bitDepth: number;

	readonly isStarted: boolean;

	rampTime: number;

	sampleRate: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { bitDepth: AKNode; sampleRate: number; });

	initBitDepthSampleRate(input: AKNode, bitDepth: number, sampleRate: number): this;

	start(): void;

	stop(): void;
}

declare class AKBitCrusherAudioUnit extends AKAudioUnit {

	static alloc(): AKBitCrusherAudioUnit; // inherited from NSObject

	static new(): AKBitCrusherAudioUnit; // inherited from NSObject

	bitDepth: number;

	sampleRate: number;
}

declare class AKBluetoothMIDIButton extends UIButton {

	static alloc(): AKBluetoothMIDIButton; // inherited from NSObject

	static appearance(): AKBluetoothMIDIButton; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKBluetoothMIDIButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKBluetoothMIDIButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKBluetoothMIDIButton; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKBluetoothMIDIButton; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKBluetoothMIDIButton; // inherited from UIAppearance

	static buttonWithType(buttonType: UIButtonType): AKBluetoothMIDIButton; // inherited from UIButton

	static new(): AKBluetoothMIDIButton; // inherited from NSObject
}

declare class AKBooster extends AKNode {

	static alloc(): AKBooster; // inherited from NSObject

	static new(): AKBooster; // inherited from NSObject

	dB: number;

	gain: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { gain: AKNode; });

	initGain(input: AKNode, gain: number): this;

	start(): void;

	stop(): void;
}

declare class AKBoosterAudioUnit extends AKAudioUnit {

	static alloc(): AKBoosterAudioUnit; // inherited from NSObject

	static new(): AKBoosterAudioUnit; // inherited from NSObject

	gain: number;
}

declare class AKBrownianNoise extends AKNode {

	static alloc(): AKBrownianNoise; // inherited from NSObject

	static new(): AKBrownianNoise; // inherited from NSObject

	amplitude: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { amplitude: number; });

	initWithAmplitude(amplitude: number): this;

	start(): void;

	stop(): void;
}

declare class AKBrownianNoiseAudioUnit extends AKAudioUnit {

	static alloc(): AKBrownianNoiseAudioUnit; // inherited from NSObject

	static new(): AKBrownianNoiseAudioUnit; // inherited from NSObject

	amplitude: number;
}

declare class AKButton extends UIView {

	static alloc(): AKButton; // inherited from NSObject

	static appearance(): AKButton; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKButton; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKButton; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKButton; // inherited from UIAppearance

	static new(): AKButton; // inherited from NSObject

	color: UIColor;

	title: string;

	constructor(o: { title: string; color: UIColor; frame: CGRect; callback: () => string; });

	initWithTitleColorFrameCallback(title: string, color: UIColor, frame: CGRect, callback: () => string): this;
}

declare class AKBypassButton extends UIView {

	static alloc(): AKBypassButton; // inherited from NSObject

	static appearance(): AKBypassButton; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKBypassButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKBypassButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKBypassButton; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKBypassButton; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKBypassButton; // inherited from UIAppearance

	static new(): AKBypassButton; // inherited from NSObject
}

declare class AKCallbackInstrument extends AKMIDIInstrument {

	static alloc(): AKCallbackInstrument; // inherited from NSObject

	static new(): AKCallbackInstrument; // inherited from NSObject
}

declare class AKChowningReverb extends AKNode {

	static alloc(): AKChowningReverb; // inherited from NSObject

	static new(): AKChowningReverb; // inherited from NSObject

	readonly isStarted: boolean;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor();

	init(input: AKNode): this;

	start(): void;

	stop(): void;
}

declare class AKChowningReverbAudioUnit extends AKAudioUnit {

	static alloc(): AKChowningReverbAudioUnit; // inherited from NSObject

	static new(): AKChowningReverbAudioUnit; // inherited from NSObject
}

declare class AKClarinet extends AKNode {

	static alloc(): AKClarinet; // inherited from NSObject

	static new(): AKClarinet; // inherited from NSObject

	amplitude: number;

	frequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { frequency: number; amplitude: number; });

	initWithFrequencyAmplitude(frequency: number, amplitude: number): this;

	start(): void;

	stop(): void;

	triggerWithFrequencyAmplitude(frequency: number, amplitude: number): void;
}

declare class AKClarinetAudioUnit extends AKAudioUnit {

	static alloc(): AKClarinetAudioUnit; // inherited from NSObject

	static new(): AKClarinetAudioUnit; // inherited from NSObject

	amplitude: number;

	frequency: number;

	triggerFrequencyAmplitude(frequency: number, amplitude: number): void;
}

declare class AKClipper extends AKNode {

	static alloc(): AKClipper; // inherited from NSObject

	static new(): AKClipper; // inherited from NSObject

	readonly isStarted: boolean;

	limit: number;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { limit: AKNode; });

	initLimit(input: AKNode, limit: number): this;

	start(): void;

	stop(): void;
}

declare class AKClipperAudioUnit extends AKAudioUnit {

	static alloc(): AKClipperAudioUnit; // inherited from NSObject

	static new(): AKClipperAudioUnit; // inherited from NSObject

	limit: number;
}

declare class AKCombFilterReverb extends AKNode {

	static alloc(): AKCombFilterReverb; // inherited from NSObject

	static new(): AKCombFilterReverb; // inherited from NSObject

	readonly isStarted: boolean;

	rampTime: number;

	reverbDuration: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { reverbDuration: AKNode; loopDuration: number; });

	initReverbDurationLoopDuration(input: AKNode, reverbDuration: number, loopDuration: number): this;

	start(): void;

	stop(): void;
}

declare class AKCombFilterReverbAudioUnit extends AKAudioUnit {

	static alloc(): AKCombFilterReverbAudioUnit; // inherited from NSObject

	static new(): AKCombFilterReverbAudioUnit; // inherited from NSObject

	reverbDuration: number;

	setLoopDuration(duration: number): void;
}

declare class AKCompressor extends AKNode {

	static alloc(): AKCompressor; // inherited from NSObject

	static new(): AKCompressor; // inherited from NSObject

	attackTime: number;

	readonly compressionAmount: number;

	dryWetMix: number;

	headRoom: number;

	readonly inputAmplitude: number;

	isStarted: boolean;

	masterGain: number;

	readonly outputAmplitude: number;

	releaseTime: number;

	threshold: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { threshold: AKNode; headRoom: number; attackTime: number; releaseTime: number; masterGain: number; });

	initThresholdHeadRoomAttackTimeReleaseTimeMasterGain(input: AKNode, threshold: number, headRoom: number, attackTime: number, releaseTime: number, masterGain: number): this;

	start(): void;

	stop(): void;
}

declare class AKConvolution extends AKNode {

	static alloc(): AKConvolution; // inherited from NSObject

	static new(): AKConvolution; // inherited from NSObject

	readonly isStarted: boolean;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { impulseResponseFileURL: AKNode; partitionLength: NSURL; });

	initImpulseResponseFileURLPartitionLength(input: AKNode, impulseResponseFileURL: NSURL, partitionLength: number): this;

	start(): void;

	stop(): void;
}

declare class AKConvolutionAudioUnit extends AKAudioUnit {

	static alloc(): AKConvolutionAudioUnit; // inherited from NSObject

	static new(): AKConvolutionAudioUnit; // inherited from NSObject

	setPartitionLength(partitionLength: number): void;

	setupAudioFileTableSize(data: interop.Pointer | interop.Reference<number>, size: number): void;
}

declare class AKCostelloReverb extends AKNode {

	static alloc(): AKCostelloReverb; // inherited from NSObject

	static new(): AKCostelloReverb; // inherited from NSObject

	cutoffFrequency: number;

	feedback: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { feedback: AKNode; cutoffFrequency: number; });

	initFeedbackCutoffFrequency(input: AKNode, feedback: number, cutoffFrequency: number): this;

	presetLowRingingLongTailCostelloReverb(): void;

	presetShortTailCostelloReverb(): void;

	printCurrentValuesAsPreset(): void;

	start(): void;

	stop(): void;
}

declare class AKCostelloReverbAudioUnit extends AKAudioUnit {

	static alloc(): AKCostelloReverbAudioUnit; // inherited from NSObject

	static new(): AKCostelloReverbAudioUnit; // inherited from NSObject

	cutoffFrequency: number;

	feedback: number;
}

declare class AKCustomUgen extends NSObject {

	static alloc(): AKCustomUgen; // inherited from NSObject

	static new(): AKCustomUgen; // inherited from NSObject

	readonly argTypes: string;

	readonly callComputeFunction: interop.FunctionReference<(p1: AKCustomUgen) => void>;

	readonly name: string;

	stack: AKSporthStack;

	userData: any;

	duplicate(): AKCustomUgen;
}

declare class AKDCBlock extends AKNode {

	static alloc(): AKDCBlock; // inherited from NSObject

	static new(): AKDCBlock; // inherited from NSObject

	readonly isStarted: boolean;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor();

	init(input: AKNode): this;

	start(): void;

	stop(): void;
}

declare class AKDCBlockAudioUnit extends AKAudioUnit {

	static alloc(): AKDCBlockAudioUnit; // inherited from NSObject

	static new(): AKDCBlockAudioUnit; // inherited from NSObject
}

declare class AKDecimator extends AKNode {

	static alloc(): AKDecimator; // inherited from NSObject

	static new(): AKDecimator; // inherited from NSObject

	decimation: number;

	isStarted: boolean;

	mix: number;

	rounding: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { decimation: AKNode; rounding: number; mix: number; });

	initDecimationRoundingMix(input: AKNode, decimation: number, rounding: number, mix: number): this;

	start(): void;

	stop(): void;
}

declare class AKDelay extends AKNode {

	static alloc(): AKDelay; // inherited from NSObject

	static new(): AKDelay; // inherited from NSObject

	dryWetMix: number;

	feedback: number;

	isStarted: boolean;

	lowPassCutoff: number;

	time: number;

	constructor(o: { time: AKNode; feedback: number; lowPassCutoff: number; dryWetMix: number; });

	initTimeFeedbackLowPassCutoffDryWetMix(input: AKNode, time: number, feedback: number, lowPassCutoff: number, dryWetMix: number): this;

	presetDenseLongDelay(): void;

	presetElectricCircuitsDelay(): void;

	presetShortDelay(): void;

	printCurrentValuesAsPreset(): void;

	start(): void;

	stop(): void;
}

declare class AKDevice extends NSObject {

	static alloc(): AKDevice; // inherited from NSObject

	static new(): AKDevice; // inherited from NSObject

	readonly deviceID: string;

	name: string;

	constructor(o: { name: string; deviceID: string; });

	initWithNameDeviceID(name: string, deviceID: string): this;
}

declare class AKDistortion extends AKNode {

	static alloc(): AKDistortion; // inherited from NSObject

	static new(): AKDistortion; // inherited from NSObject

	cubicTerm: number;

	decay: number;

	decimation: number;

	decimationMix: number;

	delay: number;

	delayMix: number;

	finalMix: number;

	isStarted: boolean;

	linearTerm: number;

	polynomialMix: number;

	ringModBalance: number;

	ringModFreq1: number;

	ringModFreq2: number;

	ringModMix: number;

	rounding: number;

	softClipGain: number;

	squaredTerm: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { delay: AKNode; decay: number; delayMix: number; decimation: number; rounding: number; decimationMix: number; linearTerm: number; squaredTerm: number; cubicTerm: number; polynomialMix: number; ringModFreq1: number; ringModFreq2: number; ringModBalance: number; ringModMix: number; softClipGain: number; finalMix: number; });

	initDelayDecayDelayMixDecimationRoundingDecimationMixLinearTermSquaredTermCubicTermPolynomialMixRingModFreq1RingModFreq2RingModBalanceRingModMixSoftClipGainFinalMix(input: AKNode, delay: number, decay: number, delayMix: number, decimation: number, rounding: number, decimationMix: number, linearTerm: number, squaredTerm: number, cubicTerm: number, polynomialMix: number, ringModFreq1: number, ringModFreq2: number, ringModBalance: number, ringModMix: number, softClipGain: number, finalMix: number): this;

	presetInfiniteDistortionWall(): void;

	printCurrentValuesAsPreset(): void;

	start(): void;

	stop(): void;
}

declare class AKDrip extends AKNode {

	static alloc(): AKDrip; // inherited from NSObject

	static new(): AKDrip; // inherited from NSObject

	amplitude: number;

	dampingFactor: number;

	energyReturn: number;

	firstResonantFrequency: number;

	intensity: number;

	readonly isStarted: boolean;

	mainResonantFrequency: number;

	rampTime: number;

	secondResonantFrequency: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { intensity: number; dampingFactor: number; energyReturn: number; mainResonantFrequency: number; firstResonantFrequency: number; secondResonantFrequency: number; amplitude: number; });

	initWithIntensityDampingFactorEnergyReturnMainResonantFrequencyFirstResonantFrequencySecondResonantFrequencyAmplitude(intensity: number, dampingFactor: number, energyReturn: number, mainResonantFrequency: number, firstResonantFrequency: number, secondResonantFrequency: number, amplitude: number): this;

	start(): void;

	stop(): void;

	trigger(): void;
}

declare class AKDripAudioUnit extends AKAudioUnit {

	static alloc(): AKDripAudioUnit; // inherited from NSObject

	static new(): AKDripAudioUnit; // inherited from NSObject

	amplitude: number;

	dampingFactor: number;

	energyReturn: number;

	firstResonantFrequency: number;

	intensity: number;

	mainResonantFrequency: number;

	secondResonantFrequency: number;

	trigger(): void;
}

declare class AKDryWetMixer extends AKNode {

	static alloc(): AKDryWetMixer; // inherited from NSObject

	static new(): AKDryWetMixer; // inherited from NSObject

	balance: number;

	isStarted: boolean;

	constructor(o: { balance: AKNode; });

	initBalance(dry: AKNode, wet: AKNode, balance: number): this;
}

declare class AKDynamicRangeCompressor extends AKNode {

	static alloc(): AKDynamicRangeCompressor; // inherited from NSObject

	static new(): AKDynamicRangeCompressor; // inherited from NSObject

	attackTime: number;

	readonly isStarted: boolean;

	rampTime: number;

	ratio: number;

	releaseTime: number;

	threshold: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { ratio: AKNode; threshold: number; attackTime: number; releaseTime: number; });

	initRatioThresholdAttackTimeReleaseTime(input: AKNode, ratio: number, threshold: number, attackTime: number, releaseTime: number): this;

	start(): void;

	stop(): void;
}

declare class AKDynamicRangeCompressorAudioUnit extends AKAudioUnit {

	static alloc(): AKDynamicRangeCompressorAudioUnit; // inherited from NSObject

	static new(): AKDynamicRangeCompressorAudioUnit; // inherited from NSObject

	attackTime: number;

	ratio: number;

	releaseTime: number;

	threshold: number;
}

declare class AKDynamicsProcessor extends AKNode {

	static alloc(): AKDynamicsProcessor; // inherited from NSObject

	static new(): AKDynamicsProcessor; // inherited from NSObject

	attackTime: number;

	readonly compressionAmount: number;

	dryWetMix: number;

	expansionRatio: number;

	expansionThreshold: number;

	headRoom: number;

	readonly inputAmplitude: number;

	isStarted: boolean;

	masterGain: number;

	readonly outputAmplitude: number;

	releaseTime: number;

	threshold: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { threshold: AKNode; headRoom: number; expansionRatio: number; expansionThreshold: number; attackTime: number; releaseTime: number; masterGain: number; compressionAmount: number; inputAmplitude: number; outputAmplitude: number; });

	initThresholdHeadRoomExpansionRatioExpansionThresholdAttackTimeReleaseTimeMasterGainCompressionAmountInputAmplitudeOutputAmplitude(input: AKNode, threshold: number, headRoom: number, expansionRatio: number, expansionThreshold: number, attackTime: number, releaseTime: number, masterGain: number, compressionAmount: number, inputAmplitude: number, outputAmplitude: number): this;

	start(): void;

	stop(): void;
}

declare class AKEqualizerFilter extends AKNode {

	static alloc(): AKEqualizerFilter; // inherited from NSObject

	static new(): AKEqualizerFilter; // inherited from NSObject

	bandwidth: number;

	centerFrequency: number;

	gain: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { centerFrequency: AKNode; bandwidth: number; gain: number; });

	initCenterFrequencyBandwidthGain(input: AKNode, centerFrequency: number, bandwidth: number, gain: number): this;

	start(): void;

	stop(): void;
}

declare class AKEqualizerFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKEqualizerFilterAudioUnit; // inherited from NSObject

	static new(): AKEqualizerFilterAudioUnit; // inherited from NSObject

	bandwidth: number;

	centerFrequency: number;

	gain: number;
}

declare class AKExpander extends AKNode {

	static alloc(): AKExpander; // inherited from NSObject

	static new(): AKExpander; // inherited from NSObject

	attackTime: number;

	readonly compressionAmount: number;

	dryWetMix: number;

	expansionRatio: number;

	expansionThreshold: number;

	readonly inputAmplitude: number;

	isStarted: boolean;

	masterGain: number;

	readonly outputAmplitude: number;

	releaseTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { threshold: AKNode; headRoom: number; expansionRatio: number; expansionThreshold: number; attackTime: number; releaseTime: number; masterGain: number; compressionAmount: number; inputAmplitude: number; outputAmplitude: number; });

	initThresholdHeadRoomExpansionRatioExpansionThresholdAttackTimeReleaseTimeMasterGainCompressionAmountInputAmplitudeOutputAmplitude(input: AKNode, threshold: number, headRoom: number, expansionRatio: number, expansionThreshold: number, attackTime: number, releaseTime: number, masterGain: number, compressionAmount: number, inputAmplitude: number, outputAmplitude: number): this;

	start(): void;

	stop(): void;
}

declare class AKFFTTap extends NSObject implements EZAudioFFTDelegate {

	static alloc(): AKFFTTap; // inherited from NSObject

	static new(): AKFFTTap; // inherited from NSObject

	fftData: NSArray<number>;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor();

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	fftUpdatedWithFFTDataBufferSize(fft: EZAudioFFT, fftData: interop.Pointer | interop.Reference<number>, bufferSize: number): void;

	init(input: AKNode): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class AKFMOscillator extends AKNode {

	static alloc(): AKFMOscillator; // inherited from NSObject

	static new(): AKFMOscillator; // inherited from NSObject

	amplitude: number;

	baseFrequency: number;

	carrierMultiplier: number;

	readonly isStarted: boolean;

	modulatingMultiplier: number;

	modulationIndex: number;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	presetBuzzer(): void;

	presetFogHorn(): void;

	presetSpiral(): void;

	presetStunRay(): void;

	presetWobble(): void;

	start(): void;

	stop(): void;
}

declare class AKFMOscillatorAudioUnit extends AKAudioUnit {

	static alloc(): AKFMOscillatorAudioUnit; // inherited from NSObject

	static new(): AKFMOscillatorAudioUnit; // inherited from NSObject

	amplitude: number;

	baseFrequency: number;

	carrierMultiplier: number;

	modulatingMultiplier: number;

	modulationIndex: number;

	setWaveformValueAtIndex(value: number, index: number): void;

	setupWaveform(size: number): void;
}

declare class AKFMOscillatorBank extends AKPolyphonicNode {

	static alloc(): AKFMOscillatorBank; // inherited from NSObject

	static new(): AKFMOscillatorBank; // inherited from NSObject

	attackDuration: number;

	carrierMultiplier: number;

	decayDuration: number;

	detuningMultiplier: number;

	detuningOffset: number;

	modulatingMultiplier: number;

	modulationIndex: number;

	rampTime: number;

	releaseDuration: number;

	sustainLevel: number;

	static readonly ComponentDescription: AudioComponentDescription;
}

declare class AKFMOscillatorBankAudioUnit extends AKAudioUnit {

	static alloc(): AKFMOscillatorBankAudioUnit; // inherited from NSObject

	static new(): AKFMOscillatorBankAudioUnit; // inherited from NSObject

	attackDuration: number;

	carrierMultiplier: number;

	decayDuration: number;

	detuningMultiplier: number;

	detuningOffset: number;

	modulatingMultiplier: number;

	modulationIndex: number;

	releaseDuration: number;

	sustainLevel: number;

	setWaveformValueAtIndex(value: number, index: number): void;

	setupWaveform(size: number): void;

	startNoteVelocity(note: number, velocity: number): void;

	stopNote(note: number): void;
}

declare class AKFlatFrequencyResponseReverb extends AKNode {

	static alloc(): AKFlatFrequencyResponseReverb; // inherited from NSObject

	static new(): AKFlatFrequencyResponseReverb; // inherited from NSObject

	readonly isStarted: boolean;

	rampTime: number;

	reverbDuration: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { reverbDuration: AKNode; loopDuration: number; });

	initReverbDurationLoopDuration(input: AKNode, reverbDuration: number, loopDuration: number): this;

	start(): void;

	stop(): void;
}

declare class AKFlatFrequencyResponseReverbAudioUnit extends AKAudioUnit {

	static alloc(): AKFlatFrequencyResponseReverbAudioUnit; // inherited from NSObject

	static new(): AKFlatFrequencyResponseReverbAudioUnit; // inherited from NSObject

	reverbDuration: number;

	setLoopDuration(duration: number): void;
}

declare class AKFlute extends AKNode {

	static alloc(): AKFlute; // inherited from NSObject

	static new(): AKFlute; // inherited from NSObject

	amplitude: number;

	frequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { frequency: number; amplitude: number; });

	initWithFrequencyAmplitude(frequency: number, amplitude: number): this;

	start(): void;

	stop(): void;

	triggerWithFrequencyAmplitude(frequency: number, amplitude: number): void;
}

declare class AKFluteAudioUnit extends AKAudioUnit {

	static alloc(): AKFluteAudioUnit; // inherited from NSObject

	static new(): AKFluteAudioUnit; // inherited from NSObject

	amplitude: number;

	frequency: number;

	triggerFrequencyAmplitude(frequency: number, amplitude: number): void;
}

declare class AKFormantFilter extends AKNode {

	static alloc(): AKFormantFilter; // inherited from NSObject

	static new(): AKFormantFilter; // inherited from NSObject

	readonly isStarted: boolean;

	rampTime: number;

	x: number;

	y: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { x: AKNode; y: number; });

	initXY(input: AKNode, x: number, y: number): this;

	start(): void;

	stop(): void;
}

declare class AKFormantFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKFormantFilterAudioUnit; // inherited from NSObject

	static new(): AKFormantFilterAudioUnit; // inherited from NSObject

	x: number;

	y: number;
}

declare class AKFrequencyTracker extends AKNode {

	static alloc(): AKFrequencyTracker; // inherited from NSObject

	static new(): AKFrequencyTracker; // inherited from NSObject

	readonly amplitude: number;

	readonly frequency: number;

	readonly isStarted: boolean;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { hopSize: AKNode; peakCount: number; });

	initHopSizePeakCount(input: AKNode, hopSize: number, peakCount: number): this;

	start(): void;

	stop(): void;
}

declare class AKFrequencyTrackerAudioUnit extends AKAudioUnit {

	static alloc(): AKFrequencyTrackerAudioUnit; // inherited from NSObject

	static new(): AKFrequencyTrackerAudioUnit; // inherited from NSObject

	readonly amplitude: number;

	readonly frequency: number;
}

declare class AKHighPassButterworthFilter extends AKNode {

	static alloc(): AKHighPassButterworthFilter; // inherited from NSObject

	static new(): AKHighPassButterworthFilter; // inherited from NSObject

	cutoffFrequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { cutoffFrequency: AKNode; });

	initCutoffFrequency(input: AKNode, cutoffFrequency: number): this;

	start(): void;

	stop(): void;
}

declare class AKHighPassButterworthFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKHighPassButterworthFilterAudioUnit; // inherited from NSObject

	static new(): AKHighPassButterworthFilterAudioUnit; // inherited from NSObject

	cutoffFrequency: number;
}

declare class AKHighPassFilter extends AKNode {

	static alloc(): AKHighPassFilter; // inherited from NSObject

	static new(): AKHighPassFilter; // inherited from NSObject

	cutoffFrequency: number;

	dryWetMix: number;

	isStarted: boolean;

	resonance: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { cutoffFrequency: AKNode; resonance: number; });

	initCutoffFrequencyResonance(input: AKNode, cutoffFrequency: number, resonance: number): this;

	start(): void;

	stop(): void;
}

declare class AKHighShelfFilter extends AKNode {

	static alloc(): AKHighShelfFilter; // inherited from NSObject

	static new(): AKHighShelfFilter; // inherited from NSObject

	cutoffFrequency: number;

	dryWetMix: number;

	gain: number;

	isStarted: boolean;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { cutOffFrequency: AKNode; gain: number; });

	initCutOffFrequencyGain(input: AKNode, cutOffFrequency: number, gain: number): this;

	start(): void;

	stop(): void;
}

declare class AKHighShelfParametricEqualizerFilter extends AKNode {

	static alloc(): AKHighShelfParametricEqualizerFilter; // inherited from NSObject

	static new(): AKHighShelfParametricEqualizerFilter; // inherited from NSObject

	centerFrequency: number;

	gain: number;

	readonly isStarted: boolean;

	q: number;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { centerFrequency: AKNode; gain: number; q: number; });

	initCenterFrequencyGainQ(input: AKNode, centerFrequency: number, gain: number, q: number): this;

	start(): void;

	stop(): void;
}

declare class AKHighShelfParametricEqualizerFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKHighShelfParametricEqualizerFilterAudioUnit; // inherited from NSObject

	static new(): AKHighShelfParametricEqualizerFilterAudioUnit; // inherited from NSObject

	centerFrequency: number;

	gain: number;

	q: number;
}

interface AKKernelUnit {

	getter(): (p1: AUParameter) => number;

	setter(): (p1: AUParameter, p2: number) => void;
}
declare var AKKernelUnit: {

	prototype: AKKernelUnit;
};

declare class AKKeyboardView extends UIView {

	static alloc(): AKKeyboardView; // inherited from NSObject

	static appearance(): AKKeyboardView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKKeyboardView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKKeyboardView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKKeyboardView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKKeyboardView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKKeyboardView; // inherited from UIAppearance

	static new(): AKKeyboardView; // inherited from NSObject

	static requiresConstraintBasedLayout(): boolean;

	blackKeyOff: UIColor;

	firstOctave: number;

	keyOnColor: UIColor;

	octaveCount: number;

	polyphonicButton: UIColor;

	polyphonicMode: boolean;

	topKeyHeightRatio: number;

	whiteKeyOff: UIColor;

	constructor(o: { width: number; height: number; firstOctave: number; octaveCount: number; polyphonic: boolean; });

	initWithWidthHeightFirstOctaveOctaveCountPolyphonic(width: number, height: number, firstOctave: number, octaveCount: number, polyphonic: boolean): this;
}

declare class AKKorgLowPassFilter extends AKNode {

	static alloc(): AKKorgLowPassFilter; // inherited from NSObject

	static new(): AKKorgLowPassFilter; // inherited from NSObject

	cutoffFrequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	resonance: number;

	saturation: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { cutoffFrequency: AKNode; resonance: number; saturation: number; });

	initCutoffFrequencyResonanceSaturation(input: AKNode, cutoffFrequency: number, resonance: number, saturation: number): this;

	start(): void;

	stop(): void;
}

declare class AKKorgLowPassFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKKorgLowPassFilterAudioUnit; // inherited from NSObject

	static new(): AKKorgLowPassFilterAudioUnit; // inherited from NSObject

	cutoffFrequency: number;

	resonance: number;

	saturation: number;
}

declare class AKLowPassButterworthFilter extends AKNode {

	static alloc(): AKLowPassButterworthFilter; // inherited from NSObject

	static new(): AKLowPassButterworthFilter; // inherited from NSObject

	cutoffFrequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { cutoffFrequency: AKNode; });

	initCutoffFrequency(input: AKNode, cutoffFrequency: number): this;

	start(): void;

	stop(): void;
}

declare class AKLowPassButterworthFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKLowPassButterworthFilterAudioUnit; // inherited from NSObject

	static new(): AKLowPassButterworthFilterAudioUnit; // inherited from NSObject

	cutoffFrequency: number;
}

declare class AKLowPassFilter extends AKNode {

	static alloc(): AKLowPassFilter; // inherited from NSObject

	static new(): AKLowPassFilter; // inherited from NSObject

	cutoffFrequency: number;

	dryWetMix: number;

	isStarted: boolean;

	resonance: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { cutoffFrequency: AKNode; resonance: number; });

	initCutoffFrequencyResonance(input: AKNode, cutoffFrequency: number, resonance: number): this;

	start(): void;

	stop(): void;
}

declare class AKLowShelfFilter extends AKNode {

	static alloc(): AKLowShelfFilter; // inherited from NSObject

	static new(): AKLowShelfFilter; // inherited from NSObject

	cutoffFrequency: number;

	dryWetMix: number;

	gain: number;

	isStarted: boolean;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { cutoffFrequency: AKNode; gain: number; });

	initCutoffFrequencyGain(input: AKNode, cutoffFrequency: number, gain: number): this;

	start(): void;

	stop(): void;
}

declare class AKLowShelfParametricEqualizerFilter extends AKNode {

	static alloc(): AKLowShelfParametricEqualizerFilter; // inherited from NSObject

	static new(): AKLowShelfParametricEqualizerFilter; // inherited from NSObject

	cornerFrequency: number;

	gain: number;

	readonly isStarted: boolean;

	q: number;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { cornerFrequency: AKNode; gain: number; q: number; });

	initCornerFrequencyGainQ(input: AKNode, cornerFrequency: number, gain: number, q: number): this;

	start(): void;

	stop(): void;
}

declare class AKLowShelfParametricEqualizerFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKLowShelfParametricEqualizerFilterAudioUnit; // inherited from NSObject

	static new(): AKLowShelfParametricEqualizerFilterAudioUnit; // inherited from NSObject

	cornerFrequency: number;

	gain: number;

	q: number;
}

declare class AKMIDIInstrument extends AKPolyphonicNode {

	static alloc(): AKMIDIInstrument; // inherited from NSObject

	static new(): AKMIDIInstrument; // inherited from NSObject

	midiIn: number;

	name: string;

	enableMIDIName(midiClient: number, name: string): void;

	receivedMIDINoteOffWithNoteNumberVelocityChannel(noteNumber: number, velocity: number, channel: number): void;

	receivedMIDINoteOnVelocityChannel(noteNumber: number, velocity: number, channel: number): void;

	startWithNoteNumberVelocityChannel(noteNumber: number, velocity: number, channel: number): void;

	stopWithNoteNumberChannel(noteNumber: number, channel: number): void;
}

declare class AKMIDINode extends AKNode {

	static alloc(): AKMIDINode; // inherited from NSObject

	static new(): AKMIDINode; // inherited from NSObject

	midiIn: number;

	name: string;

	constructor(o: { node: AKPolyphonicNode; });

	enableMIDIName(midiClient: number, name: string): void;

	initWithNode(node: AKPolyphonicNode): this;

	receivedMIDINoteOnVelocityChannel(noteNumber: number, velocity: number, channel: number): void;
}

declare class AKMIDISampler extends AKSampler {

	static alloc(): AKMIDISampler; // inherited from NSObject

	static new(): AKMIDISampler; // inherited from NSObject

	midiIn: number;

	name: string;

	destroyEndpoint(): void;

	enableMIDIName(midiClient: number, name: string): void;

	midiCCValueChannel(controller: number, value: number, channel: number): void;

	receivedMIDINoteOnNoteNumberVelocityChannel(noteNumber: number, velocity: number, channel: number): void;
}

declare class AKMandolin extends AKNode {

	static alloc(): AKMandolin; // inherited from NSObject

	static new(): AKMandolin; // inherited from NSObject

	bodySize: number;

	detune: number;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { detune: number; bodySize: number; });

	fretWithNoteNumberCourse(noteNumber: number, course: number): void;

	initWithDetuneBodySize(detune: number, bodySize: number): this;

	pluckWithCoursePositionVelocity(course: number, position: number, velocity: number): void;

	prepareChord(course1Note: number, course2Note: number, course3Note: number, course4Note: number): void;

	presetAcidMandolin(): void;

	presetElectricGuitarMandolin(): void;

	presetLargeResonantMandolin(): void;

	presetOctaveUpMandolin(): void;

	presetSmallBodiedDistortedMandolin(): void;

	printCurrentValuesAsPreset(): void;

	strumVelocity(position: number, velocity: number): void;
}

declare class AKMandolinAudioUnit extends AKAudioUnit {

	static alloc(): AKMandolinAudioUnit; // inherited from NSObject

	static new(): AKMandolinAudioUnit; // inherited from NSObject

	bodySize: number;

	detune: number;

	muteCourse(course: number): void;

	pluckCoursePositionVelocity(course: number, position: number, velocity: number): void;

	setFrequencyCourse(frequency: number, course: number): void;
}

declare class AKMetalBar extends AKNode {

	static alloc(): AKMetalBar; // inherited from NSObject

	static new(): AKMetalBar; // inherited from NSObject

	decayDuration: number;

	readonly isStarted: boolean;

	leftBoundaryCondition: number;

	position: number;

	rampTime: number;

	rightBoundaryCondition: number;

	scanSpeed: number;

	strikeVelocity: number;

	strikeWidth: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { leftBoundaryCondition: number; rightBoundaryCondition: number; decayDuration: number; scanSpeed: number; position: number; strikeVelocity: number; strikeWidth: number; stiffness: number; highFrequencyDamping: number; });

	initWithLeftBoundaryConditionRightBoundaryConditionDecayDurationScanSpeedPositionStrikeVelocityStrikeWidthStiffnessHighFrequencyDamping(leftBoundaryCondition: number, rightBoundaryCondition: number, decayDuration: number, scanSpeed: number, position: number, strikeVelocity: number, strikeWidth: number, stiffness: number, highFrequencyDamping: number): this;

	start(): void;

	stop(): void;

	trigger(): void;
}

declare class AKMetalBarAudioUnit extends AKAudioUnit {

	static alloc(): AKMetalBarAudioUnit; // inherited from NSObject

	static new(): AKMetalBarAudioUnit; // inherited from NSObject

	decayDuration: number;

	leftBoundaryCondition: number;

	position: number;

	rightBoundaryCondition: number;

	scanSpeed: number;

	strikeVelocity: number;

	strikeWidth: number;

	trigger(): void;
}

declare class AKMicrophone extends AKNode {

	static alloc(): AKMicrophone; // inherited from NSObject

	static new(): AKMicrophone; // inherited from NSObject

	readonly isStarted: boolean;

	volume: number;

	setDeviceError(device: AKDevice): boolean;

	start(): void;

	stop(): void;
}

declare class AKMixer extends AKNode {

	static alloc(): AKMixer; // inherited from NSObject

	static new(): AKMixer; // inherited from NSObject

	readonly isStarted: boolean;

	volume: number;

	constructor();

	connect(input: AKNode): void;

	init(inputs: NSArray<AKNode>): this;

	start(): void;

	stop(): void;
}

declare class AKModalResonanceFilter extends AKNode {

	static alloc(): AKModalResonanceFilter; // inherited from NSObject

	static new(): AKModalResonanceFilter; // inherited from NSObject

	frequency: number;

	readonly isStarted: boolean;

	qualityFactor: number;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { frequency: AKNode; qualityFactor: number; });

	initFrequencyQualityFactor(input: AKNode, frequency: number, qualityFactor: number): this;

	start(): void;

	stop(): void;
}

declare class AKModalResonanceFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKModalResonanceFilterAudioUnit; // inherited from NSObject

	static new(): AKModalResonanceFilterAudioUnit; // inherited from NSObject

	frequency: number;

	qualityFactor: number;
}

declare class AKMoogLadder extends AKNode {

	static alloc(): AKMoogLadder; // inherited from NSObject

	static new(): AKMoogLadder; // inherited from NSObject

	cutoffFrequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	resonance: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { cutoffFrequency: AKNode; resonance: number; });

	initCutoffFrequencyResonance(input: AKNode, cutoffFrequency: number, resonance: number): this;

	presetDullNoiseMoogLadder(): void;

	presetFogMoogLadder(): void;

	printCurrentValuesAsPreset(): void;

	start(): void;

	stop(): void;
}

declare class AKMoogLadderAudioUnit extends AKAudioUnit {

	static alloc(): AKMoogLadderAudioUnit; // inherited from NSObject

	static new(): AKMoogLadderAudioUnit; // inherited from NSObject

	cutoffFrequency: number;

	resonance: number;
}

declare class AKMorphingOscillator extends AKNode {

	static alloc(): AKMorphingOscillator; // inherited from NSObject

	static new(): AKMorphingOscillator; // inherited from NSObject

	amplitude: number;

	detuningMultiplier: number;

	detuningOffset: number;

	frequency: number;

	index: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	start(): void;

	stop(): void;
}

declare class AKMorphingOscillatorAudioUnit extends AKAudioUnit {

	static alloc(): AKMorphingOscillatorAudioUnit; // inherited from NSObject

	static new(): AKMorphingOscillatorAudioUnit; // inherited from NSObject

	amplitude: number;

	detuningMultiplier: number;

	detuningOffset: number;

	frequency: number;

	index: number;

	setWaveformWithValueAtIndex(waveform: number, value: number, index: number): void;

	setupWaveformSize(waveform: number, size: number): void;
}

declare class AKMorphingOscillatorBank extends AKPolyphonicNode {

	static alloc(): AKMorphingOscillatorBank; // inherited from NSObject

	static new(): AKMorphingOscillatorBank; // inherited from NSObject

	attackDuration: number;

	decayDuration: number;

	detuningMultiplier: number;

	detuningOffset: number;

	index: number;

	rampTime: number;

	releaseDuration: number;

	sustainLevel: number;

	static readonly ComponentDescription: AudioComponentDescription;
}

declare class AKMorphingOscillatorBankAudioUnit extends AKAudioUnit {

	static alloc(): AKMorphingOscillatorBankAudioUnit; // inherited from NSObject

	static new(): AKMorphingOscillatorBankAudioUnit; // inherited from NSObject

	attackDuration: number;

	decayDuration: number;

	detuningMultiplier: number;

	detuningOffset: number;

	index: number;

	releaseDuration: number;

	sustainLevel: number;

	setWaveformWithValueAtIndex(waveform: number, value: number, index: number): void;

	setupWaveformSize(waveform: number, size: number): void;

	startNoteVelocity(note: number, velocity: number): void;

	stopNote(note: number): void;
}

declare class AKNode extends NSObject {

	static alloc(): AKNode; // inherited from NSObject

	static new(): AKNode; // inherited from NSObject

	avAudioNode: AVAudioNode;

	constructor(o: { avAudioNode: AVAudioNode; attach: boolean; });

	addConnectionPointBus(node: AKNode, bus: number): void;

	initWithAvAudioNodeAttach(avAudioNode: AVAudioNode, attach: boolean): this;
}

declare class AKNodeFFTPlot extends EZAudioPlot implements EZAudioFFTDelegate {

	static alloc(): AKNodeFFTPlot; // inherited from NSObject

	static appearance(): AKNodeFFTPlot; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKNodeFFTPlot; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKNodeFFTPlot; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKNodeFFTPlot; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKNodeFFTPlot; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKNodeFFTPlot; // inherited from UIAppearance

	static new(): AKNodeFFTPlot; // inherited from NSObject

	node: AKNode;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { frame: AKNode; bufferSize: CGRect; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	fftUpdatedWithFFTDataBufferSize(fft: EZAudioFFT, fftData: interop.Pointer | interop.Reference<number>, bufferSize: number): void;

	initFrameBufferSize(input: AKNode, frame: CGRect, bufferSize: number): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class AKNodeOutputPlot extends EZAudioPlot {

	static alloc(): AKNodeOutputPlot; // inherited from NSObject

	static appearance(): AKNodeOutputPlot; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKNodeOutputPlot; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKNodeOutputPlot; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKNodeOutputPlot; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKNodeOutputPlot; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKNodeOutputPlot; // inherited from UIAppearance

	static new(): AKNodeOutputPlot; // inherited from NSObject

	node: AKNode;

	constructor(o: { frame: AKNode; bufferSize: CGRect; });

	initFrameBufferSize(input: AKNode, frame: CGRect, bufferSize: number): this;
}

declare class AKNodeRecorder extends NSObject {

	static alloc(): AKNodeRecorder; // inherited from NSObject

	static new(): AKNodeRecorder; // inherited from NSObject

	readonly audioFile: AKAudioFile;

	durationToRecord: number;

	readonly isRecording: boolean;

	readonly recordedDuration: number;

	constructor(o: { node: AKNode; file: AKAudioFile; });

	initWithNodeFileError(node: AKNode, file: AKAudioFile): this;

	recordAndReturnError(): boolean;

	resetAndReturnError(): boolean;

	stop(): void;
}

declare class AKOfflineRenderer extends NSObject {

	static alloc(): AKOfflineRenderer; // inherited from NSObject

	static new(): AKOfflineRenderer; // inherited from NSObject

	engine: AVAudioEngine;

	constructor(o: { engine: AVAudioEngine; });

	initWithEngine(injun: AVAudioEngine): this;

	render(samples: number): void;
}

declare class AKOperationEffect extends AKNode {

	static alloc(): AKOperationEffect; // inherited from NSObject

	static new(): AKOperationEffect; // inherited from NSObject

	readonly isStarted: boolean;

	parameters: NSArray<number>;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { sporth: AKNode; customUgens: string; });

	initSporthCustomUgens(input: AKNode, sporth: string, customUgens: NSArray<AKCustomUgen>): this;

	start(): void;

	stop(): void;
}

declare class AKOperationEffectAudioUnit extends AKAudioUnit {

	static alloc(): AKOperationEffectAudioUnit; // inherited from NSObject

	static new(): AKOperationEffectAudioUnit; // inherited from NSObject

	parameters: NSArray<any>;

	addCustomUgen(ugen: AKCustomUgen): void;

	setSporth(sporth: string): void;
}

declare class AKOperationGenerator extends AKNode {

	static alloc(): AKOperationGenerator; // inherited from NSObject

	static new(): AKOperationGenerator; // inherited from NSObject

	readonly isStarted: boolean;

	parameters: NSArray<number>;

	sporth: string;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { sporth: string; customUgens: NSArray<AKCustomUgen>; });

	initWithSporthCustomUgens(sporth: string, customUgens: NSArray<AKCustomUgen>): this;

	restart(): void;

	start(): void;

	stop(): void;

	trigger(triggerNumber: number): void;
}

declare class AKOperationGeneratorAudioUnit extends AKAudioUnit {

	static alloc(): AKOperationGeneratorAudioUnit; // inherited from NSObject

	static new(): AKOperationGeneratorAudioUnit; // inherited from NSObject

	parameters: NSArray<any>;

	addCustomUgen(ugen: AKCustomUgen): void;

	setSporth(sporth: string): void;

	trigger(trigger: number): void;
}

declare class AKOscillator extends AKNode {

	static alloc(): AKOscillator; // inherited from NSObject

	static new(): AKOscillator; // inherited from NSObject

	amplitude: number;

	detuningMultiplier: number;

	detuningOffset: number;

	frequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	start(): void;

	stop(): void;
}

declare class AKOscillatorAudioUnit extends AKAudioUnit {

	static alloc(): AKOscillatorAudioUnit; // inherited from NSObject

	static new(): AKOscillatorAudioUnit; // inherited from NSObject

	amplitude: number;

	detuningMultiplier: number;

	detuningOffset: number;

	frequency: number;

	setWaveformValueAtIndex(value: number, index: number): void;

	setupWaveform(size: number): void;
}

declare class AKOscillatorBank extends AKPolyphonicNode {

	static alloc(): AKOscillatorBank; // inherited from NSObject

	static new(): AKOscillatorBank; // inherited from NSObject

	attackDuration: number;

	decayDuration: number;

	detuningMultiplier: number;

	detuningOffset: number;

	rampTime: number;

	releaseDuration: number;

	sustainLevel: number;

	static readonly ComponentDescription: AudioComponentDescription;
}

declare class AKOscillatorBankAudioUnit extends AKAudioUnit {

	static alloc(): AKOscillatorBankAudioUnit; // inherited from NSObject

	static new(): AKOscillatorBankAudioUnit; // inherited from NSObject

	attackDuration: number;

	decayDuration: number;

	detuningMultiplier: number;

	detuningOffset: number;

	releaseDuration: number;

	sustainLevel: number;

	setWaveformValueAtIndex(value: number, index: number): void;

	setupWaveform(size: number): void;

	startNoteVelocity(note: number, velocity: number): void;

	stopNote(note: number): void;
}

declare class AKOutputWaveformPlot extends EZAudioPlot {

	static alloc(): AKOutputWaveformPlot; // inherited from NSObject

	static appearance(): AKOutputWaveformPlot; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKOutputWaveformPlot; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKOutputWaveformPlot; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKOutputWaveformPlot; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKOutputWaveformPlot; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKOutputWaveformPlot; // inherited from UIAppearance

	static createViewWithWidthHeight(width: number, height: number): UIView;

	static new(): AKOutputWaveformPlot; // inherited from NSObject

	constructor(o: { frame: CGRect; bufferSize: number; });

	initWithFrameBufferSize(frame: CGRect, bufferSize: number): this;
}

declare class AKPWMOscillator extends AKNode {

	static alloc(): AKPWMOscillator; // inherited from NSObject

	static new(): AKPWMOscillator; // inherited from NSObject

	amplitude: number;

	detuningMultiplier: number;

	detuningOffset: number;

	frequency: number;

	readonly isStarted: boolean;

	pulseWidth: number;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { frequency: number; amplitude: number; pulseWidth: number; detuningOffset: number; detuningMultiplier: number; });

	initWithFrequencyAmplitudePulseWidthDetuningOffsetDetuningMultiplier(frequency: number, amplitude: number, pulseWidth: number, detuningOffset: number, detuningMultiplier: number): this;

	start(): void;

	stop(): void;
}

declare class AKPWMOscillatorAudioUnit extends AKAudioUnit {

	static alloc(): AKPWMOscillatorAudioUnit; // inherited from NSObject

	static new(): AKPWMOscillatorAudioUnit; // inherited from NSObject

	amplitude: number;

	detuningMultiplier: number;

	detuningOffset: number;

	frequency: number;

	pulseWidth: number;
}

declare class AKPWMOscillatorBank extends AKPolyphonicNode {

	static alloc(): AKPWMOscillatorBank; // inherited from NSObject

	static new(): AKPWMOscillatorBank; // inherited from NSObject

	attackDuration: number;

	decayDuration: number;

	detuningMultiplier: number;

	detuningOffset: number;

	pulseWidth: number;

	rampTime: number;

	releaseDuration: number;

	sustainLevel: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { pulseWidth: number; attackDuration: number; decayDuration: number; sustainLevel: number; releaseDuration: number; detuningOffset: number; detuningMultiplier: number; });

	initWithPulseWidthAttackDurationDecayDurationSustainLevelReleaseDurationDetuningOffsetDetuningMultiplier(pulseWidth: number, attackDuration: number, decayDuration: number, sustainLevel: number, releaseDuration: number, detuningOffset: number, detuningMultiplier: number): this;
}

declare class AKPWMOscillatorBankAudioUnit extends AKAudioUnit {

	static alloc(): AKPWMOscillatorBankAudioUnit; // inherited from NSObject

	static new(): AKPWMOscillatorBankAudioUnit; // inherited from NSObject

	attackDuration: number;

	decayDuration: number;

	detuningMultiplier: number;

	detuningOffset: number;

	pulseWidth: number;

	releaseDuration: number;

	sustainLevel: number;

	startNoteVelocity(note: number, velocity: number): void;

	stopNote(note: number): void;
}

declare class AKPanner extends AKNode {

	static alloc(): AKPanner; // inherited from NSObject

	static new(): AKPanner; // inherited from NSObject

	readonly isStarted: boolean;

	pan: number;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { pan: AKNode; });

	initPan(input: AKNode, pan: number): this;

	start(): void;

	stop(): void;
}

declare class AKPannerAudioUnit extends AKAudioUnit {

	static alloc(): AKPannerAudioUnit; // inherited from NSObject

	static new(): AKPannerAudioUnit; // inherited from NSObject

	pan: number;
}

declare class AKPeakLimiter extends AKNode {

	static alloc(): AKPeakLimiter; // inherited from NSObject

	static new(): AKPeakLimiter; // inherited from NSObject

	attackTime: number;

	decayTime: number;

	dryWetMix: number;

	isStarted: boolean;

	preGain: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { attackTime: AKNode; decayTime: number; preGain: number; });

	initAttackTimeDecayTimePreGain(input: AKNode, attackTime: number, decayTime: number, preGain: number): this;

	start(): void;

	stop(): void;
}

declare class AKPeakingParametricEqualizerFilter extends AKNode {

	static alloc(): AKPeakingParametricEqualizerFilter; // inherited from NSObject

	static new(): AKPeakingParametricEqualizerFilter; // inherited from NSObject

	centerFrequency: number;

	gain: number;

	readonly isStarted: boolean;

	q: number;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { centerFrequency: AKNode; gain: number; q: number; });

	initCenterFrequencyGainQ(input: AKNode, centerFrequency: number, gain: number, q: number): this;

	start(): void;

	stop(): void;
}

declare class AKPeakingParametricEqualizerFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKPeakingParametricEqualizerFilterAudioUnit; // inherited from NSObject

	static new(): AKPeakingParametricEqualizerFilterAudioUnit; // inherited from NSObject

	centerFrequency: number;

	gain: number;

	q: number;
}

declare class AKPhaseDistortionOscillator extends AKNode {

	static alloc(): AKPhaseDistortionOscillator; // inherited from NSObject

	static new(): AKPhaseDistortionOscillator; // inherited from NSObject

	amplitude: number;

	detuningMultiplier: number;

	detuningOffset: number;

	frequency: number;

	readonly isStarted: boolean;

	phaseDistortion: number;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	start(): void;

	stop(): void;
}

declare class AKPhaseDistortionOscillatorAudioUnit extends AKAudioUnit {

	static alloc(): AKPhaseDistortionOscillatorAudioUnit; // inherited from NSObject

	static new(): AKPhaseDistortionOscillatorAudioUnit; // inherited from NSObject

	amplitude: number;

	detuningMultiplier: number;

	detuningOffset: number;

	frequency: number;

	phaseDistortion: number;

	setWaveformValueAtIndex(value: number, index: number): void;

	setupWaveform(size: number): void;
}

declare class AKPhaseDistortionOscillatorBank extends AKPolyphonicNode {

	static alloc(): AKPhaseDistortionOscillatorBank; // inherited from NSObject

	static new(): AKPhaseDistortionOscillatorBank; // inherited from NSObject

	attackDuration: number;

	decayDuration: number;

	detuningMultiplier: number;

	detuningOffset: number;

	phaseDistortion: number;

	rampTime: number;

	releaseDuration: number;

	sustainLevel: number;

	static readonly ComponentDescription: AudioComponentDescription;
}

declare class AKPhaseDistortionOscillatorBankAudioUnit extends AKAudioUnit {

	static alloc(): AKPhaseDistortionOscillatorBankAudioUnit; // inherited from NSObject

	static new(): AKPhaseDistortionOscillatorBankAudioUnit; // inherited from NSObject

	attackDuration: number;

	decayDuration: number;

	detuningMultiplier: number;

	detuningOffset: number;

	phaseDistortion: number;

	releaseDuration: number;

	sustainLevel: number;

	setWaveformValueAtIndex(value: number, index: number): void;

	setupWaveform(size: number): void;

	startNoteVelocity(note: number, velocity: number): void;

	stopNote(note: number): void;
}

declare class AKPhaseLockedVocoder extends AKNode {

	static alloc(): AKPhaseLockedVocoder; // inherited from NSObject

	static new(): AKPhaseLockedVocoder; // inherited from NSObject

	amplitude: number;

	readonly isStarted: boolean;

	pitchRatio: number;

	position: number;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { file: AVAudioFile; position: number; amplitude: number; pitchRatio: number; });

	initWithFilePositionAmplitudePitchRatio(file: AVAudioFile, position: number, amplitude: number, pitchRatio: number): this;

	start(): void;

	stop(): void;
}

declare class AKPhaseLockedVocoderAudioUnit extends AKAudioUnit {

	static alloc(): AKPhaseLockedVocoderAudioUnit; // inherited from NSObject

	static new(): AKPhaseLockedVocoderAudioUnit; // inherited from NSObject

	amplitude: number;

	pitchRatio: number;

	position: number;

	setupAudioFileTableSize(data: interop.Pointer | interop.Reference<number>, size: number): void;
}

declare class AKPhaser extends AKNode {

	static alloc(): AKPhaser; // inherited from NSObject

	static new(): AKPhaser; // inherited from NSObject

	depth: number;

	feedback: number;

	inverted: number;

	readonly isStarted: boolean;

	lfoBPM: number;

	notchFrequency: number;

	notchMaximumFrequency: number;

	notchMinimumFrequency: number;

	notchWidth: number;

	rampTime: number;

	vibratoMode: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { notchMinimumFrequency: AKNode; notchMaximumFrequency: number; notchWidth: number; notchFrequency: number; vibratoMode: number; depth: number; feedback: number; inverted: number; lfoBPM: number; });

	initNotchMinimumFrequencyNotchMaximumFrequencyNotchWidthNotchFrequencyVibratoModeDepthFeedbackInvertedLfoBPM(input: AKNode, notchMinimumFrequency: number, notchMaximumFrequency: number, notchWidth: number, notchFrequency: number, vibratoMode: number, depth: number, feedback: number, inverted: number, lfoBPM: number): this;

	start(): void;

	stop(): void;
}

declare class AKPhaserAudioUnit extends AKAudioUnit {

	static alloc(): AKPhaserAudioUnit; // inherited from NSObject

	static new(): AKPhaserAudioUnit; // inherited from NSObject

	depth: number;

	feedback: number;

	inverted: number;

	lfoBPM: number;

	notchFrequency: number;

	notchMaximumFrequency: number;

	notchMinimumFrequency: number;

	notchWidth: number;

	vibratoMode: number;
}

declare class AKPinkNoise extends AKNode {

	static alloc(): AKPinkNoise; // inherited from NSObject

	static new(): AKPinkNoise; // inherited from NSObject

	amplitude: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { amplitude: number; });

	initWithAmplitude(amplitude: number): this;

	start(): void;

	stop(): void;
}

declare class AKPinkNoiseAudioUnit extends AKAudioUnit {

	static alloc(): AKPinkNoiseAudioUnit; // inherited from NSObject

	static new(): AKPinkNoiseAudioUnit; // inherited from NSObject

	amplitude: number;
}

declare class AKPitchShifter extends AKNode {

	static alloc(): AKPitchShifter; // inherited from NSObject

	static new(): AKPitchShifter; // inherited from NSObject

	crossfade: number;

	readonly isStarted: boolean;

	rampTime: number;

	shift: number;

	windowSize: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { shift: AKNode; windowSize: number; crossfade: number; });

	initShiftWindowSizeCrossfade(input: AKNode, shift: number, windowSize: number, crossfade: number): this;

	start(): void;

	stop(): void;
}

declare class AKPitchShifterAudioUnit extends AKAudioUnit {

	static alloc(): AKPitchShifterAudioUnit; // inherited from NSObject

	static new(): AKPitchShifterAudioUnit; // inherited from NSObject

	crossfade: number;

	shift: number;

	windowSize: number;
}

declare class AKPlaygroundLoop extends NSObject {

	static alloc(): AKPlaygroundLoop; // inherited from NSObject

	static new(): AKPlaygroundLoop; // inherited from NSObject

	constructor(o: { every: number; handler: () => void; });

	constructor(o: { frequency: number; handler: () => void; });

	initWithEveryHandler(dur: number, handler: () => void): this;

	initWithFrequencyHandler(frequency: number, handler: () => void): this;
}

declare class AKPlaygroundView extends UIView {

	static alloc(): AKPlaygroundView; // inherited from NSObject

	static appearance(): AKPlaygroundView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKPlaygroundView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKPlaygroundView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKPlaygroundView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKPlaygroundView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKPlaygroundView; // inherited from UIAppearance

	static new(): AKPlaygroundView; // inherited from NSObject

	elementHeight: number;

	spacing: number;

	yPosition: number;

	addLabel(text: string): UILabel;

	addTitle(text: string): UILabel;

	setup(): void;
}

declare class AKPluckedString extends AKNode {

	static alloc(): AKPluckedString; // inherited from NSObject

	static new(): AKPluckedString; // inherited from NSObject

	amplitude: number;

	frequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { frequency: number; amplitude: number; lowestFrequency: number; });

	initWithFrequencyAmplitudeLowestFrequency(frequency: number, amplitude: number, lowestFrequency: number): this;

	start(): void;

	stop(): void;

	triggerWithFrequencyAmplitude(frequency: number, amplitude: number): void;
}

declare class AKPluckedStringAudioUnit extends AKAudioUnit {

	static alloc(): AKPluckedStringAudioUnit; // inherited from NSObject

	static new(): AKPluckedStringAudioUnit; // inherited from NSObject

	amplitude: number;

	frequency: number;

	triggerFrequencyAmplitude(frequency: number, amplitude: number): void;
}

declare class AKPolyphonicNode extends AKNode {

	static alloc(): AKPolyphonicNode; // inherited from NSObject

	static new(): AKPolyphonicNode; // inherited from NSObject

	playWithNoteNumberVelocity(noteNumber: number, velocity: number): void;

	stopWithNoteNumber(noteNumber: number): void;
}

declare class AKPresetLoaderView extends UIView {

	static alloc(): AKPresetLoaderView; // inherited from NSObject

	static appearance(): AKPresetLoaderView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKPresetLoaderView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKPresetLoaderView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKPresetLoaderView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKPresetLoaderView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKPresetLoaderView; // inherited from UIAppearance

	static new(): AKPresetLoaderView; // inherited from NSObject

	callback: (p1: string) => void;

	label: string;

	presets: NSArray<string>;

	constructor(o: { presets: NSArray<string>; frame: CGRect; callback: (p1: string) => void; });

	initWithPresetsFrameCallback(presets: NSArray<string>, frame: CGRect, callback: (p1: string) => void): this;
}

declare class AKPropertySlider extends UIView {

	static alloc(): AKPropertySlider; // inherited from NSObject

	static appearance(): AKPropertySlider; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKPropertySlider; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKPropertySlider; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKPropertySlider; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKPropertySlider; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKPropertySlider; // inherited from UIAppearance

	static new(): AKPropertySlider; // inherited from NSObject

	static requiresConstraintBasedLayout(): boolean;

	bgColor: UIColor;

	callback: (p1: number) => void;

	fontSize: number;

	format: string;

	lastTouch: CGPoint;

	maximum: number;

	minimum: number;

	property: string;

	sliderColor: UIColor;

	textColor: UIColor;

	value: number;

	constructor(o: { property: string; format: string; value: number; minimum: number; maximum: number; color: UIColor; frame: CGRect; callback: (p1: number) => void; });

	initWithPropertyFormatValueMinimumMaximumColorFrameCallback(property: string, format: string, value: number, minimum: number, maximum: number, color: UIColor, frame: CGRect, callback: (p1: number) => void): this;

	randomize(): number;
}

declare class AKResonantFilter extends AKNode {

	static alloc(): AKResonantFilter; // inherited from NSObject

	static new(): AKResonantFilter; // inherited from NSObject

	bandwidth: number;

	frequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { frequency: AKNode; bandwidth: number; });

	initFrequencyBandwidth(input: AKNode, frequency: number, bandwidth: number): this;

	start(): void;

	stop(): void;
}

declare class AKResonantFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKResonantFilterAudioUnit; // inherited from NSObject

	static new(): AKResonantFilterAudioUnit; // inherited from NSObject

	bandwidth: number;

	frequency: number;
}

declare class AKResourcesAudioFileLoaderView extends UIView {

	static alloc(): AKResourcesAudioFileLoaderView; // inherited from NSObject

	static appearance(): AKResourcesAudioFileLoaderView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKResourcesAudioFileLoaderView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKResourcesAudioFileLoaderView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKResourcesAudioFileLoaderView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKResourcesAudioFileLoaderView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKResourcesAudioFileLoaderView; // inherited from UIAppearance

	static new(): AKResourcesAudioFileLoaderView; // inherited from NSObject

	constructor(o: { player: AKAudioPlayer; filenames: NSArray<string>; frame: CGRect; });

	initWithPlayerFilenamesFrame(player: AKAudioPlayer, filenames: NSArray<string>, frame: CGRect): this;
}

declare class AKReverb extends AKNode {

	static alloc(): AKReverb; // inherited from NSObject

	static new(): AKReverb; // inherited from NSObject

	dryWetMix: number;

	isStarted: boolean;

	constructor(o: { dryWetMix: AKNode; });

	initDryWetMix(input: AKNode, dryWetMix: number): this;

	loadFactoryPreset(preset: AVAudioUnitReverbPreset): void;

	start(): void;

	stop(): void;
}

declare class AKReverb2 extends AKNode {

	static alloc(): AKReverb2; // inherited from NSObject

	static new(): AKReverb2; // inherited from NSObject

	decayTimeAt0Hz: number;

	decayTimeAtNyquist: number;

	dryWetMix: number;

	gain: number;

	isStarted: boolean;

	maxDelayTime: number;

	minDelayTime: number;

	randomizeReflections: number;

	constructor(o: { dryWetMix: AKNode; gain: number; minDelayTime: number; maxDelayTime: number; decayTimeAt0Hz: number; decayTimeAtNyquist: number; randomizeReflections: number; });

	initDryWetMixGainMinDelayTimeMaxDelayTimeDecayTimeAt0HzDecayTimeAtNyquistRandomizeReflections(input: AKNode, dryWetMix: number, gain: number, minDelayTime: number, maxDelayTime: number, decayTimeAt0Hz: number, decayTimeAtNyquist: number, randomizeReflections: number): this;

	start(): void;

	stop(): void;
}

declare class AKRhodesPiano extends AKNode {

	static alloc(): AKRhodesPiano; // inherited from NSObject

	static new(): AKRhodesPiano; // inherited from NSObject

	amplitude: number;

	frequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { frequency: number; amplitude: number; });

	initWithFrequencyAmplitude(frequency: number, amplitude: number): this;

	start(): void;

	stop(): void;

	triggerWithFrequencyAmplitude(frequency: number, amplitude: number): void;
}

declare class AKRhodesPianoAudioUnit extends AKAudioUnit {

	static alloc(): AKRhodesPianoAudioUnit; // inherited from NSObject

	static new(): AKRhodesPianoAudioUnit; // inherited from NSObject

	amplitude: number;

	frequency: number;

	triggerFrequencyAmplitude(frequency: number, amplitude: number): void;
}

declare class AKRingModulator extends AKNode {

	static alloc(): AKRingModulator; // inherited from NSObject

	static new(): AKRingModulator; // inherited from NSObject

	balance: number;

	frequency1: number;

	frequency2: number;

	isStarted: boolean;

	mix: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { frequency1: AKNode; frequency2: number; balance: number; mix: number; });

	initFrequency1Frequency2BalanceMix(input: AKNode, frequency1: number, frequency2: number, balance: number, mix: number): this;

	start(): void;

	stop(): void;
}

declare class AKRolandTB303Filter extends AKNode {

	static alloc(): AKRolandTB303Filter; // inherited from NSObject

	static new(): AKRolandTB303Filter; // inherited from NSObject

	cutoffFrequency: number;

	distortion: number;

	readonly isStarted: boolean;

	rampTime: number;

	resonance: number;

	resonanceAsymmetry: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { cutoffFrequency: AKNode; resonance: number; distortion: number; resonanceAsymmetry: number; });

	initCutoffFrequencyResonanceDistortionResonanceAsymmetry(input: AKNode, cutoffFrequency: number, resonance: number, distortion: number, resonanceAsymmetry: number): this;

	start(): void;

	stop(): void;
}

declare class AKRolandTB303FilterAudioUnit extends AKAudioUnit {

	static alloc(): AKRolandTB303FilterAudioUnit; // inherited from NSObject

	static new(): AKRolandTB303FilterAudioUnit; // inherited from NSObject

	cutoffFrequency: number;

	distortion: number;

	resonance: number;

	resonanceAsymmetry: number;
}

declare class AKRollingOutputPlot extends EZAudioPlot {

	static alloc(): AKRollingOutputPlot; // inherited from NSObject

	static appearance(): AKRollingOutputPlot; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKRollingOutputPlot; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKRollingOutputPlot; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKRollingOutputPlot; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKRollingOutputPlot; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKRollingOutputPlot; // inherited from UIAppearance

	static createViewWithWidthHeight(width: number, height: number): UIView;

	static new(): AKRollingOutputPlot; // inherited from NSObject

	constructor(o: { frame: CGRect; bufferSize: number; });

	initWithFrameBufferSize(frame: CGRect, bufferSize: number): this;

	reconnect(): void;
}

declare class AKSampler extends AKNode {

	static alloc(): AKSampler; // inherited from NSObject

	static new(): AKSampler; // inherited from NSObject

	amplitude: number;

	pan: number;

	samplerUnit: AVAudioUnitSampler;

	tuning: number;

	volume: number;

	loadAudioFileError(file: AKAudioFile): boolean;

	loadAudioFilesError(files: NSArray<AKAudioFile>): boolean;

	loadEXS24Error(file: string): boolean;

	loadMelodicSoundFontPresetError(file: string, preset: number): boolean;

	loadPath(filePath: string): void;

	loadPercussiveSoundFontPresetError(file: string, preset: number): boolean;

	loadSoundFontPresetBankError(file: string, preset: number, bank: number): boolean;

	loadWavError(file: string): boolean;

	playWithNoteNumberVelocityChannel(noteNumber: number, velocity: number, channel: number): void;

	stopWithNoteNumberChannel(noteNumber: number, channel: number): void;
}

declare class AKSettings extends NSObject {

	static alloc(): AKSettings; // inherited from NSObject

	static new(): AKSettings; // inherited from NSObject

	static setAudioInputEnabled(value: boolean): void;

	static setBluetoothOptions(value: AVAudioSessionCategoryOptions): void;

	static setBufferLength(value: BufferLength): void;

	static setDefaultToSpeaker(value: boolean): void;

	static setDisableAVAudioSessionCategoryManagement(value: boolean): void;

	static setEnableLogging(value: boolean): void;

	static setFixTruncatedRecordings(value: boolean): void;

	static setNotificationsEnabled(value: boolean): void;

	static setNumberOfChannels(value: number): void;

	static setPlaybackWhileMuted(value: boolean): void;

	static setRampTime(value: number): void;

	static setRecordingBufferLength(value: BufferLength): void;

	static setSampleRate(value: number): void;

	static setSessionWithCategoryOptionsError(category: SessionCategory, options: number): boolean;

	static setSessionWithCategoryWithError(category: SessionCategory, options: AVAudioSessionCategoryOptions): boolean;

	static setUseBluetooth(value: boolean): void;

	static readonly audioFormat: AVAudioFormat;

	static audioInputEnabled: boolean;

	static bluetoothOptions: AVAudioSessionCategoryOptions;

	static bufferLength: BufferLength;

	static defaultToSpeaker: boolean;

	static disableAVAudioSessionCategoryManagement: boolean;

	static enableLogging: boolean;

	static fixTruncatedRecordings: boolean;

	static readonly headPhonesPlugged: boolean;

	static notificationsEnabled: boolean;

	static numberOfChannels: number;

	static playbackWhileMuted: boolean;

	static rampTime: number;

	static recordingBufferLength: BufferLength;

	static sampleRate: number;

	static readonly session: AVAudioSession;

	static useBluetooth: boolean;
}

declare class AKShaker extends AKNode {

	static alloc(): AKShaker; // inherited from NSObject

	static new(): AKShaker; // inherited from NSObject

	amplitude: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	start(): void;

	stop(): void;

	triggerWithAmplitude(amplitude: number): void;
}

declare class AKShakerAudioUnit extends AKAudioUnit {

	static alloc(): AKShakerAudioUnit; // inherited from NSObject

	static new(): AKShakerAudioUnit; // inherited from NSObject

	amplitude: number;

	type: number;

	triggerTypeAmplitude(type: number, amplitude: number): void;
}

declare class AKSporthStack extends NSObject {

	static alloc(): AKSporthStack; // inherited from NSObject

	static new(): AKSporthStack; // inherited from NSObject

	popFloat(): number;

	popString(): string;

	pushFloat(f: number): void;

	pushString(str: string): void;
}

declare class AKStepper extends UIView {

	static alloc(): AKStepper; // inherited from NSObject

	static appearance(): AKStepper; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKStepper; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKStepper; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKStepper; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKStepper; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKStepper; // inherited from UIAppearance

	static new(): AKStepper; // inherited from NSObject

	callback: (p1: number) => void;

	text: string;

	value: number;

	constructor(o: { text: string; value: number; frame: CGRect; callback: (p1: number) => void; });

	initWithTextValueFrameCallback(text: string, value: number, frame: CGRect, callback: (p1: number) => void): this;
}

declare class AKStereoFieldLimiter extends AKNode {

	static alloc(): AKStereoFieldLimiter; // inherited from NSObject

	static new(): AKStereoFieldLimiter; // inherited from NSObject

	amount: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { amount: AKNode; });

	initAmount(input: AKNode, amount: number): this;

	start(): void;

	stop(): void;
}

declare class AKStereoFieldLimiterAudioUnit extends AKAudioUnit {

	static alloc(): AKStereoFieldLimiterAudioUnit; // inherited from NSObject

	static new(): AKStereoFieldLimiterAudioUnit; // inherited from NSObject

	amount: number;
}

declare class AKStereoInput extends AKNode {

	static alloc(): AKStereoInput; // inherited from NSObject

	static new(): AKStereoInput; // inherited from NSObject

	readonly isStarted: boolean;

	volume: number;

	start(): void;

	stop(): void;
}

declare class AKStringResonator extends AKNode {

	static alloc(): AKStringResonator; // inherited from NSObject

	static new(): AKStringResonator; // inherited from NSObject

	feedback: number;

	fundamentalFrequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { fundamentalFrequency: AKNode; feedback: number; });

	initFundamentalFrequencyFeedback(input: AKNode, fundamentalFrequency: number, feedback: number): this;

	start(): void;

	stop(): void;
}

declare class AKStringResonatorAudioUnit extends AKAudioUnit {

	static alloc(): AKStringResonatorAudioUnit; // inherited from NSObject

	static new(): AKStringResonatorAudioUnit; // inherited from NSObject

	feedback: number;

	fundamentalFrequency: number;
}

declare class AKSynthKick extends AKMIDIInstrument {

	static alloc(): AKSynthKick; // inherited from NSObject

	static new(): AKSynthKick; // inherited from NSObject
}

declare class AKSynthSnare extends AKMIDIInstrument {

	static alloc(): AKSynthSnare; // inherited from NSObject

	static new(): AKSynthSnare; // inherited from NSObject

	constructor(o: { duration: number; resonance: number; });

	initWithDurationResonance(duration: number, resonance: number): this;
}

declare class AKTanhDistortion extends AKNode {

	static alloc(): AKTanhDistortion; // inherited from NSObject

	static new(): AKTanhDistortion; // inherited from NSObject

	readonly isStarted: boolean;

	negativeShapeParameter: number;

	postgain: number;

	postiveShapeParameter: number;

	pregain: number;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { pregain: AKNode; postgain: number; postiveShapeParameter: number; negativeShapeParameter: number; });

	initPregainPostgainPostiveShapeParameterNegativeShapeParameter(input: AKNode, pregain: number, postgain: number, postiveShapeParameter: number, negativeShapeParameter: number): this;

	start(): void;

	stop(): void;
}

declare class AKTanhDistortionAudioUnit extends AKAudioUnit {

	static alloc(): AKTanhDistortionAudioUnit; // inherited from NSObject

	static new(): AKTanhDistortionAudioUnit; // inherited from NSObject

	negativeShapeParameter: number;

	postgain: number;

	postiveShapeParameter: number;

	pregain: number;
}

declare class AKTelephoneView extends UIView {

	static alloc(): AKTelephoneView; // inherited from NSObject

	static appearance(): AKTelephoneView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AKTelephoneView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AKTelephoneView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AKTelephoneView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AKTelephoneView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AKTelephoneView; // inherited from UIAppearance

	static drawCenteredKeyWithNumeralIsPressed(numeral: string, isPressed: boolean): void;

	static drawKeyWithTextNumeralIsPressed(text: string, numeral: string, isPressed: boolean): void;

	static new(): AKTelephoneView; // inherited from NSObject

	constructor(o: { frame: CGRect; callback: (p1: string, p2: string) => void; });

	initWithFrameCallback(frame: CGRect, callback: (p1: string, p2: string) => void): this;
}

declare class AKTester extends AKNode {

	static alloc(): AKTester; // inherited from NSObject

	static new(): AKTester; // inherited from NSObject

	readonly MD5: string;

	readonly isStarted: boolean;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { samples: AKNode; });

	initSamples(input: AKNode, samples: number): this;

	start(): void;

	stop(): void;
}

declare class AKTesterAudioUnit extends AKAudioUnit {

	static alloc(): AKTesterAudioUnit; // inherited from NSObject

	static new(): AKTesterAudioUnit; // inherited from NSObject

	readonly md5: string;

	samples: number;
}

declare class AKThreePoleLowpassFilter extends AKNode {

	static alloc(): AKThreePoleLowpassFilter; // inherited from NSObject

	static new(): AKThreePoleLowpassFilter; // inherited from NSObject

	cutoffFrequency: number;

	distortion: number;

	readonly isStarted: boolean;

	rampTime: number;

	resonance: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { distortion: AKNode; cutoffFrequency: number; resonance: number; });

	initDistortionCutoffFrequencyResonance(input: AKNode, distortion: number, cutoffFrequency: number, resonance: number): this;

	start(): void;

	stop(): void;
}

declare class AKThreePoleLowpassFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKThreePoleLowpassFilterAudioUnit; // inherited from NSObject

	static new(): AKThreePoleLowpassFilterAudioUnit; // inherited from NSObject

	cutoffFrequency: number;

	distortion: number;

	resonance: number;
}

declare class AKTimePitch extends AKNode {

	static alloc(): AKTimePitch; // inherited from NSObject

	static new(): AKTimePitch; // inherited from NSObject

	readonly isStarted: boolean;

	overlap: number;

	pitch: number;

	rate: number;

	constructor(o: { rate: AKNode; pitch: number; overlap: number; });

	initRatePitchOverlap(input: AKNode, rate: number, pitch: number, overlap: number): this;

	start(): void;

	stop(): void;
}

declare class AKToneComplementFilter extends AKNode {

	static alloc(): AKToneComplementFilter; // inherited from NSObject

	static new(): AKToneComplementFilter; // inherited from NSObject

	halfPowerPoint: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { halfPowerPoint: AKNode; });

	initHalfPowerPoint(input: AKNode, halfPowerPoint: number): this;

	start(): void;

	stop(): void;
}

declare class AKToneComplementFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKToneComplementFilterAudioUnit; // inherited from NSObject

	static new(): AKToneComplementFilterAudioUnit; // inherited from NSObject

	halfPowerPoint: number;
}

declare class AKToneFilter extends AKNode {

	static alloc(): AKToneFilter; // inherited from NSObject

	static new(): AKToneFilter; // inherited from NSObject

	halfPowerPoint: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { halfPowerPoint: AKNode; });

	initHalfPowerPoint(input: AKNode, halfPowerPoint: number): this;

	start(): void;

	stop(): void;
}

declare class AKToneFilterAudioUnit extends AKAudioUnit {

	static alloc(): AKToneFilterAudioUnit; // inherited from NSObject

	static new(): AKToneFilterAudioUnit; // inherited from NSObject

	halfPowerPoint: number;
}

declare class AKTremolo extends AKNode {

	static alloc(): AKTremolo; // inherited from NSObject

	static new(): AKTremolo; // inherited from NSObject

	depth: number;

	frequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	start(): void;

	stop(): void;
}

declare class AKTremoloAudioUnit extends AKAudioUnit {

	static alloc(): AKTremoloAudioUnit; // inherited from NSObject

	static new(): AKTremoloAudioUnit; // inherited from NSObject

	depth: number;

	frequency: number;

	setWaveformValueAtIndex(value: number, index: number): void;

	setupWaveform(size: number): void;
}

declare class AKTubularBells extends AKNode {

	static alloc(): AKTubularBells; // inherited from NSObject

	static new(): AKTubularBells; // inherited from NSObject

	amplitude: number;

	frequency: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { frequency: number; amplitude: number; });

	initWithFrequencyAmplitude(frequency: number, amplitude: number): this;

	start(): void;

	stop(): void;

	triggerWithFrequencyAmplitude(frequency: number, amplitude: number): void;
}

declare class AKTubularBellsAudioUnit extends AKAudioUnit {

	static alloc(): AKTubularBellsAudioUnit; // inherited from NSObject

	static new(): AKTubularBellsAudioUnit; // inherited from NSObject

	amplitude: number;

	frequency: number;

	triggerFrequencyAmplitude(frequency: number, amplitude: number): void;
}

declare class AKVariSpeed extends AKNode {

	static alloc(): AKVariSpeed; // inherited from NSObject

	static new(): AKVariSpeed; // inherited from NSObject

	readonly isStarted: boolean;

	rate: number;

	constructor(o: { rate: AKNode; });

	initRate(input: AKNode, rate: number): this;

	start(): void;

	stop(): void;
}

declare class AKVariableDelay extends AKNode {

	static alloc(): AKVariableDelay; // inherited from NSObject

	static new(): AKVariableDelay; // inherited from NSObject

	feedback: number;

	readonly isStarted: boolean;

	rampTime: number;

	time: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { time: AKNode; feedback: number; maximumDelayTime: number; });

	initTimeFeedbackMaximumDelayTime(input: AKNode, time: number, feedback: number, maximumDelayTime: number): this;

	start(): void;

	stop(): void;
}

declare class AKVariableDelayAudioUnit extends AKAudioUnit {

	static alloc(): AKVariableDelayAudioUnit; // inherited from NSObject

	static new(): AKVariableDelayAudioUnit; // inherited from NSObject

	feedback: number;

	time: number;
}

declare class AKWhiteNoise extends AKNode {

	static alloc(): AKWhiteNoise; // inherited from NSObject

	static new(): AKWhiteNoise; // inherited from NSObject

	amplitude: number;

	readonly isStarted: boolean;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { amplitude: number; });

	initWithAmplitude(amplitude: number): this;

	start(): void;

	stop(): void;
}

declare class AKWhiteNoiseAudioUnit extends AKAudioUnit {

	static alloc(): AKWhiteNoiseAudioUnit; // inherited from NSObject

	static new(): AKWhiteNoiseAudioUnit; // inherited from NSObject

	amplitude: number;
}

declare class AKZitaReverb extends AKNode {

	static alloc(): AKZitaReverb; // inherited from NSObject

	static new(): AKZitaReverb; // inherited from NSObject

	crossoverFrequency: number;

	dampingFrequency: number;

	delay: number;

	dryWetMix: number;

	equalizerFrequency1: number;

	equalizerFrequency2: number;

	equalizerLevel1: number;

	equalizerLevel2: number;

	readonly isStarted: boolean;

	lowReleaseTime: number;

	midReleaseTime: number;

	rampTime: number;

	static readonly ComponentDescription: AudioComponentDescription;

	constructor(o: { delay: AKNode; crossoverFrequency: number; lowReleaseTime: number; midReleaseTime: number; dampingFrequency: number; equalizerFrequency1: number; equalizerLevel1: number; equalizerFrequency2: number; equalizerLevel2: number; dryWetMix: number; });

	initDelayCrossoverFrequencyLowReleaseTimeMidReleaseTimeDampingFrequencyEqualizerFrequency1EqualizerLevel1EqualizerFrequency2EqualizerLevel2DryWetMix(input: AKNode, delay: number, crossoverFrequency: number, lowReleaseTime: number, midReleaseTime: number, dampingFrequency: number, equalizerFrequency1: number, equalizerLevel1: number, equalizerFrequency2: number, equalizerLevel2: number, dryWetMix: number): this;

	start(): void;

	stop(): void;
}

declare class AKZitaReverbAudioUnit extends AKAudioUnit {

	static alloc(): AKZitaReverbAudioUnit; // inherited from NSObject

	static new(): AKZitaReverbAudioUnit; // inherited from NSObject

	crossoverFrequency: number;

	dampingFrequency: number;

	delay: number;

	dryWetMix: number;

	equalizerFrequency1: number;

	equalizerFrequency2: number;

	equalizerLevel1: number;

	equalizerLevel2: number;

	lowReleaseTime: number;

	midReleaseTime: number;
}

declare class AudioKit extends NSObject {

	static alloc(): AudioKit; // inherited from NSObject

	static auditionTestWithNodeDuration(node: AKNode, duration: number): void;

	static new(): AudioKit; // inherited from NSObject

	static setFormat(value: AVAudioFormat): void;

	static setInputDeviceError(input: AKDevice): boolean;

	static setOutput(newValue: AKNode): void;

	static setOutputDeviceError(output: AKDevice): boolean;

	static setTester(value: AKTester): void;

	static start(): void;

	static stop(): void;

	static testWithNodeDuration(node: AKNode, duration: number): void;

	static readonly availableInputs: NSArray<AKDevice>;

	static readonly engine: AVAudioEngine;

	static format: AVAudioFormat;

	static readonly inputDevice: AKDevice;

	static readonly inputs: NSArray<AKDevice>;

	static output: AKNode;

	static readonly outputDevice: AKDevice;

	static readonly outputs: NSArray<AKDevice>;

	static tester: AKTester;
}

declare var AudioKitVersionNumber: number;

declare var AudioKitVersionString: interop.Reference<number>;

declare const enum BaseDirectory {

	Temp = 0,

	Documents = 1,

	Resources = 2,

	Custom = 3
}

declare const enum BufferLength {

	Shortest = 5,

	VeryShort = 6,

	Short = 7,

	Medium = 8,

	Long = 9,

	VeryLong = 10,

	Huge = 11,

	Longest = 12
}

declare class EZAudio extends NSObject {

	static AIFFFormatWithNumberOfChannelsSampleRate(channels: number, sampleRate: number): AudioStreamBasicDescription;

	static M4AFormatWithNumberOfChannelsSampleRate(channels: number, sampleRate: number): AudioStreamBasicDescription;

	static MAPLeftMinLeftMaxRightMinRightMax(value: number, leftMin: number, leftMax: number, rightMin: number, rightMax: number): number;

	static RMSLength(buffer: interop.Pointer | interop.Reference<number>, bufferSize: number): number;

	static SGN(value: number): number;

	static alloc(): EZAudio; // inherited from NSObject

	static appendBufferAndShiftWithBufferSizeToScrollHistoryWithScrollHistorySize(buffer: interop.Pointer | interop.Reference<number>, bufferLength: number, scrollHistory: interop.Pointer | interop.Reference<number>, scrollHistoryLength: number): void;

	static appendValueToScrollHistoryWithScrollHistorySize(value: number, scrollHistory: interop.Pointer | interop.Reference<number>, scrollHistoryLength: number): void;

	static audioBufferListWithNumberOfFramesNumberOfChannelsInterleaved(frames: number, channels: number, interleaved: boolean): interop.Pointer | interop.Reference<AudioBufferList>;

	static checkResultOperation(result: number, operation: string): void;

	static displayTimeStringFromSeconds(seconds: number): string;

	static floatBuffersWithNumberOfFramesNumberOfChannels(frames: number, channels: number): interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>;

	static floatFormatWithNumberOfChannelsSampleRate(channels: number, sampleRate: number): AudioStreamBasicDescription;

	static freeBufferList(bufferList: interop.Pointer | interop.Reference<AudioBufferList>): void;

	static freeFloatBuffersNumberOfChannels(buffers: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, channels: number): void;

	static iLBCFormatWithSampleRate(sampleRate: number): AudioStreamBasicDescription;

	static isFloatFormat(asbd: AudioStreamBasicDescription): boolean;

	static isInterleaved(asbd: AudioStreamBasicDescription): boolean;

	static isLinearPCM(asbd: AudioStreamBasicDescription): boolean;

	static monoCanonicalFormatWithSampleRate(sampleRate: number): AudioStreamBasicDescription;

	static monoFloatFormatWithSampleRate(sampleRate: number): AudioStreamBasicDescription;

	static new(): EZAudio; // inherited from NSObject

	static printASBD(asbd: AudioStreamBasicDescription): void;

	static setCanonicalAudioStreamBasicDescriptionNumberOfChannelsInterleaved(asbd: interop.Pointer | interop.Reference<AudioStreamBasicDescription>, nChannels: number, interleaved: boolean): void;

	static setShouldExitOnCheckResultFail(shouldExitOnCheckResultFail: boolean): void;

	static shouldExitOnCheckResultFail(): boolean;

	static stereoCanonicalNonInterleavedFormatWithSampleRate(sampleRate: number): AudioStreamBasicDescription;

	static stereoFloatInterleavedFormatWithSampleRate(sampleRate: number): AudioStreamBasicDescription;

	static stereoFloatNonInterleavedFormatWithSampleRate(sampleRate: number): AudioStreamBasicDescription;

	static stringForAudioStreamBasicDescription(asbd: AudioStreamBasicDescription): string;

	static stringFromUInt32Code(code: number): string;

	static updateScrollHistoryWithLengthAtIndexWithBufferWithBufferSizeIsResolutionChanging(scrollHistory: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, scrollHistoryLength: number, index: interop.Pointer | interop.Reference<number>, buffer: interop.Pointer | interop.Reference<number>, bufferSize: number, isChanging: interop.Pointer | interop.Reference<boolean>): void;
}

declare class EZAudioDevice extends NSObject {

	static alloc(): EZAudioDevice; // inherited from NSObject

	static currentInputDevice(): EZAudioDevice;

	static currentOutputDevice(): EZAudioDevice;

	static enumerateInputDevicesUsingBlock(block: (p1: EZAudioDevice, p2: interop.Pointer | interop.Reference<boolean>) => void): void;

	static enumerateOutputDevicesUsingBlock(block: (p1: EZAudioDevice, p2: interop.Pointer | interop.Reference<boolean>) => void): void;

	static inputDevices(): NSArray<any>;

	static new(): EZAudioDevice; // inherited from NSObject

	static outputDevices(): NSArray<any>;

	readonly dataSource: AVAudioSessionDataSourceDescription;

	readonly name: string;

	readonly port: AVAudioSessionPortDescription;
}

declare class EZAudioDisplayLink extends NSObject {

	static alloc(): EZAudioDisplayLink; // inherited from NSObject

	static displayLinkWithDelegate(delegate: EZAudioDisplayLinkDelegate): EZAudioDisplayLink;

	static new(): EZAudioDisplayLink; // inherited from NSObject

	delegate: EZAudioDisplayLinkDelegate;

	start(): void;

	stop(): void;
}

interface EZAudioDisplayLinkDelegate extends NSObjectProtocol {

	displayLinkNeedsDisplay(displayLink: EZAudioDisplayLink): void;
}
declare var EZAudioDisplayLinkDelegate: {

	prototype: EZAudioDisplayLinkDelegate;
};

declare class EZAudioFFT extends NSObject {

	static alloc(): EZAudioFFT; // inherited from NSObject

	static fftWithMaximumBufferSizeSampleRate(maximumBufferSize: number, sampleRate: number): EZAudioFFT;

	static fftWithMaximumBufferSizeSampleRateDelegate(maximumBufferSize: number, sampleRate: number, delegate: EZAudioFFTDelegate): EZAudioFFT;

	static new(): EZAudioFFT; // inherited from NSObject

	readonly complexSplit: DSPSplitComplex;

	delegate: EZAudioFFTDelegate;

	readonly fftData: interop.Pointer | interop.Reference<number>;

	readonly fftSetup: interop.Pointer | interop.Reference<any>;

	readonly inversedFFTData: interop.Pointer | interop.Reference<number>;

	readonly maxFrequency: number;

	readonly maxFrequencyIndex: number;

	readonly maxFrequencyMagnitude: number;

	readonly maximumBufferSize: number;

	sampleRate: number;

	constructor(o: { maximumBufferSize: number; sampleRate: number; });

	constructor(o: { maximumBufferSize: number; sampleRate: number; delegate: EZAudioFFTDelegate; });

	computeFFTWithBufferWithBufferSize(buffer: interop.Pointer | interop.Reference<number>, bufferSize: number): interop.Pointer | interop.Reference<number>;

	frequencyAtIndex(index: number): number;

	frequencyMagnitudeAtIndex(index: number): number;

	initWithMaximumBufferSizeSampleRate(maximumBufferSize: number, sampleRate: number): this;

	initWithMaximumBufferSizeSampleRateDelegate(maximumBufferSize: number, sampleRate: number, delegate: EZAudioFFTDelegate): this;
}

interface EZAudioFFTDelegate extends NSObjectProtocol {

	fftUpdatedWithFFTDataBufferSize?(fft: EZAudioFFT, fftData: interop.Pointer | interop.Reference<number>, bufferSize: number): void;
}
declare var EZAudioFFTDelegate: {

	prototype: EZAudioFFTDelegate;
};

declare class EZAudioFFTRolling extends EZAudioFFT {

	static alloc(): EZAudioFFTRolling; // inherited from NSObject

	static fftWithMaximumBufferSizeSampleRate(maximumBufferSize: number, sampleRate: number): EZAudioFFTRolling; // inherited from EZAudioFFT

	static fftWithMaximumBufferSizeSampleRateDelegate(maximumBufferSize: number, sampleRate: number, delegate: EZAudioFFTDelegate): EZAudioFFTRolling; // inherited from EZAudioFFT

	static fftWithWindowSizeHistoryBufferSizeSampleRate(windowSize: number, historyBufferSize: number, sampleRate: number): EZAudioFFTRolling;

	static fftWithWindowSizeHistoryBufferSizeSampleRateDelegate(windowSize: number, historyBufferSize: number, sampleRate: number, delegate: EZAudioFFTDelegate): EZAudioFFTRolling;

	static fftWithWindowSizeSampleRate(windowSize: number, sampleRate: number): EZAudioFFTRolling;

	static fftWithWindowSizeSampleRateDelegate(windowSize: number, sampleRate: number, delegate: EZAudioFFTDelegate): EZAudioFFTRolling;

	static new(): EZAudioFFTRolling; // inherited from NSObject

	readonly timeDomainBufferSize: number;

	readonly timeDomainData: interop.Pointer | interop.Reference<number>;

	readonly windowSize: number;

	constructor(o: { windowSize: number; historyBufferSize: number; sampleRate: number; });

	constructor(o: { windowSize: number; historyBufferSize: number; sampleRate: number; delegate: EZAudioFFTDelegate; });

	constructor(o: { windowSize: number; sampleRate: number; });

	constructor(o: { windowSize: number; sampleRate: number; delegate: EZAudioFFTDelegate; });

	initWithWindowSizeHistoryBufferSizeSampleRate(windowSize: number, historyBufferSize: number, sampleRate: number): this;

	initWithWindowSizeHistoryBufferSizeSampleRateDelegate(windowSize: number, historyBufferSize: number, sampleRate: number, delegate: EZAudioFFTDelegate): this;

	initWithWindowSizeSampleRate(windowSize: number, sampleRate: number): this;

	initWithWindowSizeSampleRateDelegate(windowSize: number, sampleRate: number, delegate: EZAudioFFTDelegate): this;
}

declare class EZAudioFile extends NSObject implements NSCopying {

	static alloc(): EZAudioFile; // inherited from NSObject

	static audioFileWithURL(url: NSURL): EZAudioFile;

	static audioFileWithURLDelegate(url: NSURL, delegate: EZAudioFileDelegate): EZAudioFile;

	static audioFileWithURLDelegateClientFormat(url: NSURL, delegate: EZAudioFileDelegate, clientFormat: AudioStreamBasicDescription): EZAudioFile;

	static defaultClientFormat(): AudioStreamBasicDescription;

	static defaultClientFormatSampleRate(): number;

	static new(): EZAudioFile; // inherited from NSObject

	static supportedAudioFileTypes(): NSArray<any>;

	readonly audioFileID: interop.Pointer | interop.Reference<any>;

	clientFormat: AudioStreamBasicDescription;

	currentTime: number;

	delegate: EZAudioFileDelegate;

	readonly duration: number;

	readonly fileFormat: AudioStreamBasicDescription;

	readonly formattedCurrentTime: string;

	readonly formattedDuration: string;

	readonly frameIndex: number;

	readonly markers: NSArray<any>;

	readonly metadata: NSDictionary<any, any>;

	readonly totalClientFrames: number;

	readonly totalDuration: number;

	readonly totalFrames: number;

	readonly url: NSURL;

	constructor(o: { URL: NSURL; });

	constructor(o: { URL: NSURL; delegate: EZAudioFileDelegate; });

	constructor(o: { URL: NSURL; delegate: EZAudioFileDelegate; clientFormat: AudioStreamBasicDescription; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	getWaveformData(): EZAudioFloatData;

	getWaveformDataWithCompletionBlock(completion: (p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, p2: number) => void): void;

	getWaveformDataWithNumberOfPoints(numberOfPoints: number): EZAudioFloatData;

	getWaveformDataWithNumberOfPointsCompletion(numberOfPoints: number, completion: (p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, p2: number) => void): void;

	initWithURL(url: NSURL): this;

	initWithURLDelegate(url: NSURL, delegate: EZAudioFileDelegate): this;

	initWithURLDelegateClientFormat(url: NSURL, delegate: EZAudioFileDelegate, clientFormat: AudioStreamBasicDescription): this;

	readFramesAudioBufferListBufferSizeEof(frames: number, audioBufferList: interop.Pointer | interop.Reference<AudioBufferList>, bufferSize: interop.Pointer | interop.Reference<number>, eof: interop.Pointer | interop.Reference<boolean>): void;

	seekToFrame(frame: number): void;
}

interface EZAudioFileDelegate extends NSObjectProtocol {

	audioFileReadAudioWithBufferSizeWithNumberOfChannels?(audioFile: EZAudioFile, buffer: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, bufferSize: number, numberOfChannels: number): void;

	audioFileUpdatedPosition?(audioFile: EZAudioFile): void;

	audioFileUpdatedPosition?(audioFile: EZAudioFile, framePosition: number): void;
}
declare var EZAudioFileDelegate: {

	prototype: EZAudioFileDelegate;
};

declare class EZAudioFileMarker extends NSObject {

	static alloc(): EZAudioFileMarker; // inherited from NSObject

	static new(): EZAudioFileMarker; // inherited from NSObject

	framePosition: number;

	markerID: number;

	name: string;

	type: number;
}

declare class EZAudioFloatConverter extends NSObject {

	static alloc(): EZAudioFloatConverter; // inherited from NSObject

	static converterWithInputFormat(inputFormat: AudioStreamBasicDescription): EZAudioFloatConverter;

	static new(): EZAudioFloatConverter; // inherited from NSObject

	readonly floatFormat: AudioStreamBasicDescription;

	readonly inputFormat: AudioStreamBasicDescription;

	constructor(o: { inputFormat: AudioStreamBasicDescription; });

	convertDataFromAudioBufferListWithNumberOfFramesToFloatBuffers(audioBufferList: interop.Pointer | interop.Reference<AudioBufferList>, frames: number, buffers: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>): void;

	convertDataFromAudioBufferListWithNumberOfFramesToFloatBuffersPacketDescriptions(audioBufferList: interop.Pointer | interop.Reference<AudioBufferList>, frames: number, buffers: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, packetDescriptions: interop.Pointer | interop.Reference<AudioStreamPacketDescription>): void;

	initWithInputFormat(inputFormat: AudioStreamBasicDescription): this;
}

declare var EZAudioFloatConverterDefaultPacketSize: number;

declare class EZAudioFloatData extends NSObject {

	static alloc(): EZAudioFloatData; // inherited from NSObject

	static dataWithNumberOfChannelsBuffersBufferSize(numberOfChannels: number, buffers: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, bufferSize: number): EZAudioFloatData;

	static new(): EZAudioFloatData; // inherited from NSObject

	readonly bufferSize: number;

	readonly buffers: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>;

	readonly numberOfChannels: number;

	bufferForChannel(channel: number): interop.Pointer | interop.Reference<number>;
}

interface EZAudioNodeInfo {
	audioUnit: interop.Pointer | interop.Reference<any>;
	node: number;
}
declare var EZAudioNodeInfo: interop.StructType<EZAudioNodeInfo>;

declare class EZAudioPlayer extends NSObject implements EZAudioFileDelegate, EZOutputDataSource, EZOutputDelegate {

	static alloc(): EZAudioPlayer; // inherited from NSObject

	static audioPlayer(): EZAudioPlayer;

	static audioPlayerWithAudioFile(audioFile: EZAudioFile): EZAudioPlayer;

	static audioPlayerWithAudioFileDelegate(audioFile: EZAudioFile, delegate: EZAudioPlayerDelegate): EZAudioPlayer;

	static audioPlayerWithDelegate(delegate: EZAudioPlayerDelegate): EZAudioPlayer;

	static audioPlayerWithURL(url: NSURL): EZAudioPlayer;

	static audioPlayerWithURLDelegate(url: NSURL, delegate: EZAudioPlayerDelegate): EZAudioPlayer;

	static new(): EZAudioPlayer; // inherited from NSObject

	static sharedAudioPlayer(): EZAudioPlayer;

	audioFile: EZAudioFile;

	currentTime: number;

	delegate: EZAudioPlayerDelegate;

	device: EZAudioDevice;

	readonly duration: number;

	readonly formattedCurrentTime: string;

	readonly formattedDuration: string;

	readonly frameIndex: number;

	readonly isPlaying: boolean;

	output: EZOutput;

	pan: number;

	shouldLoop: boolean;

	readonly totalFrames: number;

	readonly url: NSURL;

	volume: number;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { audioFile: EZAudioFile; });

	constructor(o: { audioFile: EZAudioFile; delegate: EZAudioPlayerDelegate; });

	constructor(o: { delegate: EZAudioPlayerDelegate; });

	constructor(o: { URL: NSURL; });

	constructor(o: { URL: NSURL; delegate: EZAudioPlayerDelegate; });

	audioFileReadAudioWithBufferSizeWithNumberOfChannels(audioFile: EZAudioFile, buffer: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, bufferSize: number, numberOfChannels: number): void;

	audioFileUpdatedPosition(audioFile: EZAudioFile): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithAudioFile(audioFile: EZAudioFile): this;

	initWithAudioFileDelegate(audioFile: EZAudioFile, delegate: EZAudioPlayerDelegate): this;

	initWithDelegate(delegate: EZAudioPlayerDelegate): this;

	initWithURL(url: NSURL): this;

	initWithURLDelegate(url: NSURL, delegate: EZAudioPlayerDelegate): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	outputChangedDevice(output: EZOutput, device: EZAudioDevice): void;

	outputChangedPlayingState(output: EZOutput, isPlaying: boolean): void;

	outputPlayedAudioWithBufferSizeWithNumberOfChannels(output: EZOutput, buffer: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, bufferSize: number, numberOfChannels: number): void;

	outputShouldFillAudioBufferListWithNumberOfFramesTimestamp(output: EZOutput, audioBufferList: interop.Pointer | interop.Reference<AudioBufferList>, frames: number, timestamp: interop.Pointer | interop.Reference<AudioTimeStamp>): number;

	pause(): void;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	play(): void;

	playAudioFile(audioFile: EZAudioFile): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	seekToFrame(frame: number): void;

	self(): this;
}

interface EZAudioPlayerDelegate extends NSObjectProtocol {

	audioPlayerPlayedAudioWithBufferSizeWithNumberOfChannelsInAudioFile?(audioPlayer: EZAudioPlayer, buffer: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, bufferSize: number, numberOfChannels: number, audioFile: EZAudioFile): void;

	audioPlayerReachedEndOfAudioFile?(audioPlayer: EZAudioPlayer, audioFile: EZAudioFile): void;

	audioPlayerUpdatedPositionInAudioFile?(audioPlayer: EZAudioPlayer, framePosition: number, audioFile: EZAudioFile): void;
}
declare var EZAudioPlayerDelegate: {

	prototype: EZAudioPlayerDelegate;
};

declare var EZAudioPlayerDidChangeAudioFileNotification: string;

declare var EZAudioPlayerDidChangeOutputDeviceNotification: string;

declare var EZAudioPlayerDidChangePanNotification: string;

declare var EZAudioPlayerDidChangePlayStateNotification: string;

declare var EZAudioPlayerDidChangeVolumeNotification: string;

declare var EZAudioPlayerDidReachEndOfFileNotification: string;

declare var EZAudioPlayerDidSeekNotification: string;

declare class EZAudioPlot extends EZPlot implements EZAudioDisplayLinkDelegate {

	static alloc(): EZAudioPlot; // inherited from NSObject

	static appearance(): EZAudioPlot; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): EZAudioPlot; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): EZAudioPlot; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): EZAudioPlot; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): EZAudioPlot; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): EZAudioPlot; // inherited from UIAppearance

	static new(): EZAudioPlot; // inherited from NSObject

	displayLink: EZAudioDisplayLink;

	fadeout: boolean;

	originalColor: UIColor;

	pointCount: number;

	points: interop.Pointer | interop.Reference<CGPoint>;

	shouldCenterYAxis: boolean;

	shouldOptimizeForRealtimePlot: boolean;

	waveformLayer: EZAudioPlotWaveformLayer;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	createPathWithPointsPointCountInRect(points: interop.Pointer | interop.Reference<CGPoint>, pointCount: number, rect: CGRect): any;

	defaultRollingHistoryLength(): number;

	displayLinkNeedsDisplay(displayLink: EZAudioDisplayLink): void;

	initialPointCount(): number;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	maximumRollingHistoryLength(): number;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	redraw(): void;

	resetHistoryBuffers(): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	rollingHistoryLength(): number;

	self(): this;

	setRollingHistoryLength(historyLength: number): number;

	setSampleDataLength(data: interop.Pointer | interop.Reference<number>, length: number): void;

	setupPlot(): void;

	updateColor(color: any): void;
}

declare var EZAudioPlotDefaultHistoryBufferLength: number;

declare var EZAudioPlotDefaultMaxHistoryBufferLength: number;

declare class EZAudioPlotGL extends GLKView {

	static alloc(): EZAudioPlotGL; // inherited from NSObject

	static appearance(): EZAudioPlotGL; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): EZAudioPlotGL; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): EZAudioPlotGL; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): EZAudioPlotGL; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): EZAudioPlotGL; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): EZAudioPlotGL; // inherited from UIAppearance

	static new(): EZAudioPlotGL; // inherited from NSObject

	color: UIColor;

	gain: number;

	plotType: EZPlotType;

	shouldFill: boolean;

	shouldMirror: boolean;

	clear(): void;

	defaultRollingHistoryLength(): number;

	maximumRollingHistoryLength(): number;

	pauseDrawing(): void;

	redraw(): void;

	redrawWithPointsPointCountBaseEffectVertexBufferObjectVertexArrayBufferInterpolatedMirroredGain(points: interop.Pointer | interop.Reference<EZAudioPlotGLPoint>, pointCount: number, baseEffect: GLKBaseEffect, vbo: number, vab: number, interpolated: boolean, mirrored: boolean, gain: number): void;

	resumeDrawing(): void;

	rollingHistoryLength(): number;

	setRollingHistoryLength(historyLength: number): number;

	setSampleDataLength(data: interop.Pointer | interop.Reference<number>, length: number): void;

	setup(): void;

	updateBufferWithBufferSize(buffer: interop.Pointer | interop.Reference<number>, bufferSize: number): void;
}

interface EZAudioPlotGLPoint {
	x: number;
	y: number;
}
declare var EZAudioPlotGLPoint: interop.StructType<EZAudioPlotGLPoint>;

declare class EZAudioPlotWaveformLayer extends CAShapeLayer {

	static alloc(): EZAudioPlotWaveformLayer; // inherited from NSObject

	static layer(): EZAudioPlotWaveformLayer; // inherited from CALayer

	static new(): EZAudioPlotWaveformLayer; // inherited from NSObject
}

declare class EZAudioUtilities extends NSObject {

	static AIFFFormatWithNumberOfChannelsSampleRate(channels: number, sampleRate: number): AudioStreamBasicDescription;

	static M4AFormatWithNumberOfChannelsSampleRate(channels: number, sampleRate: number): AudioStreamBasicDescription;

	static MAPLeftMinLeftMaxRightMinRightMax(value: number, leftMin: number, leftMax: number, rightMin: number, rightMax: number): number;

	static RMSLength(buffer: interop.Pointer | interop.Reference<number>, bufferSize: number): number;

	static SGN(value: number): number;

	static alloc(): EZAudioUtilities; // inherited from NSObject

	static appendBufferAndShiftWithBufferSizeToScrollHistoryWithScrollHistorySize(buffer: interop.Pointer | interop.Reference<number>, bufferLength: number, scrollHistory: interop.Pointer | interop.Reference<number>, scrollHistoryLength: number): void;

	static appendValueToScrollHistoryWithScrollHistorySize(value: number, scrollHistory: interop.Pointer | interop.Reference<number>, scrollHistoryLength: number): void;

	static audioBufferListWithNumberOfFramesNumberOfChannelsInterleaved(frames: number, channels: number, interleaved: boolean): interop.Pointer | interop.Reference<AudioBufferList>;

	static checkResultOperation(result: number, operation: string): void;

	static displayTimeStringFromSeconds(seconds: number): string;

	static floatBuffersWithNumberOfFramesNumberOfChannels(frames: number, channels: number): interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>;

	static floatFormatWithNumberOfChannelsSampleRate(channels: number, sampleRate: number): AudioStreamBasicDescription;

	static freeBufferList(bufferList: interop.Pointer | interop.Reference<AudioBufferList>): void;

	static freeFloatBuffersNumberOfChannels(buffers: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, channels: number): void;

	static getColorComponentsFromCGColorRedGreenBlueAlpha(color: any, red: interop.Pointer | interop.Reference<number>, green: interop.Pointer | interop.Reference<number>, blue: interop.Pointer | interop.Reference<number>, alpha: interop.Pointer | interop.Reference<number>): void;

	static iLBCFormatWithSampleRate(sampleRate: number): AudioStreamBasicDescription;

	static isFloatFormat(asbd: AudioStreamBasicDescription): boolean;

	static isInterleaved(asbd: AudioStreamBasicDescription): boolean;

	static isLinearPCM(asbd: AudioStreamBasicDescription): boolean;

	static monoCanonicalFormatWithSampleRate(sampleRate: number): AudioStreamBasicDescription;

	static monoFloatFormatWithSampleRate(sampleRate: number): AudioStreamBasicDescription;

	static new(): EZAudioUtilities; // inherited from NSObject

	static noteNameStringForFrequencyIncludeOctave(frequency: number, includeOctave: boolean): string;

	static printASBD(asbd: AudioStreamBasicDescription): void;

	static setCanonicalAudioStreamBasicDescriptionNumberOfChannelsInterleaved(asbd: interop.Pointer | interop.Reference<AudioStreamBasicDescription>, nChannels: number, interleaved: boolean): void;

	static setShouldExitOnCheckResultFail(shouldExitOnCheckResultFail: boolean): void;

	static shouldExitOnCheckResultFail(): boolean;

	static stereoCanonicalNonInterleavedFormatWithSampleRate(sampleRate: number): AudioStreamBasicDescription;

	static stereoFloatInterleavedFormatWithSampleRate(sampleRate: number): AudioStreamBasicDescription;

	static stereoFloatNonInterleavedFormatWithSampleRate(sampleRate: number): AudioStreamBasicDescription;

	static stringForAudioStreamBasicDescription(asbd: AudioStreamBasicDescription): string;

	static stringFromUInt32Code(code: number): string;

	static updateScrollHistoryWithLengthAtIndexWithBufferWithBufferSizeIsResolutionChanging(scrollHistory: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, scrollHistoryLength: number, index: interop.Pointer | interop.Reference<number>, buffer: interop.Pointer | interop.Reference<number>, bufferSize: number, isChanging: interop.Pointer | interop.Reference<boolean>): void;
}

declare var EZAudioVersionNumber: number;

declare var EZAudioVersionString: interop.Reference<number>;

declare class EZMicrophone extends NSObject implements EZOutputDataSource {

	static alloc(): EZMicrophone; // inherited from NSObject

	static microphoneWithDelegate(delegate: EZMicrophoneDelegate): EZMicrophone;

	static microphoneWithDelegateStartsImmediately(delegate: EZMicrophoneDelegate, startsImmediately: boolean): EZMicrophone;

	static microphoneWithDelegateWithAudioStreamBasicDescription(delegate: EZMicrophoneDelegate, audioStreamBasicDescription: AudioStreamBasicDescription): EZMicrophone;

	static microphoneWithDelegateWithAudioStreamBasicDescriptionStartsImmediately(delegate: EZMicrophoneDelegate, audioStreamBasicDescription: AudioStreamBasicDescription, startsImmediately: boolean): EZMicrophone;

	static new(): EZMicrophone; // inherited from NSObject

	static sharedMicrophone(): EZMicrophone;

	delegate: EZMicrophoneDelegate;

	device: EZAudioDevice;

	microphoneOn: boolean;

	output: EZOutput;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { microphoneDelegate: EZMicrophoneDelegate; });

	constructor(o: { microphoneDelegate: EZMicrophoneDelegate; startsImmediately: boolean; });

	constructor(o: { microphoneDelegate: EZMicrophoneDelegate; withAudioStreamBasicDescription: AudioStreamBasicDescription; });

	constructor(o: { microphoneDelegate: EZMicrophoneDelegate; withAudioStreamBasicDescription: AudioStreamBasicDescription; startsImmediately: boolean; });

	audioStreamBasicDescription(): AudioStreamBasicDescription;

	audioUnit(): interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	defaultStreamFormat(): AudioStreamBasicDescription;

	initWithMicrophoneDelegate(delegate: EZMicrophoneDelegate): this;

	initWithMicrophoneDelegateStartsImmediately(delegate: EZMicrophoneDelegate, startsImmediately: boolean): this;

	initWithMicrophoneDelegateWithAudioStreamBasicDescription(delegate: EZMicrophoneDelegate, audioStreamBasicDescription: AudioStreamBasicDescription): this;

	initWithMicrophoneDelegateWithAudioStreamBasicDescriptionStartsImmediately(delegate: EZMicrophoneDelegate, audioStreamBasicDescription: AudioStreamBasicDescription, startsImmediately: boolean): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	numberOfChannels(): number;

	outputShouldFillAudioBufferListWithNumberOfFramesTimestamp(output: EZOutput, audioBufferList: interop.Pointer | interop.Reference<AudioBufferList>, frames: number, timestamp: interop.Pointer | interop.Reference<AudioTimeStamp>): number;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setAudioStreamBasicDescription(asbd: AudioStreamBasicDescription): void;

	setDevice(device: EZAudioDevice): void;

	setOutput(output: EZOutput): void;

	startFetchingAudio(): void;

	stopFetchingAudio(): void;
}

interface EZMicrophoneDelegate extends NSObjectProtocol {

	microphoneChangedDevice?(microphone: EZMicrophone, device: EZAudioDevice): void;

	microphoneChangedPlayingState?(microphone: EZMicrophone, isPlaying: boolean): void;

	microphoneHasAudioReceivedWithBufferSizeWithNumberOfChannels?(microphone: EZMicrophone, buffer: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, bufferSize: number, numberOfChannels: number): void;

	microphoneHasAudioStreamBasicDescription?(microphone: EZMicrophone, audioStreamBasicDescription: AudioStreamBasicDescription): void;

	microphoneHasBufferListWithBufferSizeWithNumberOfChannels?(microphone: EZMicrophone, bufferList: interop.Pointer | interop.Reference<AudioBufferList>, bufferSize: number, numberOfChannels: number): void;
}
declare var EZMicrophoneDelegate: {

	prototype: EZMicrophoneDelegate;
};

declare class EZOutput extends NSObject {

	static alloc(): EZOutput; // inherited from NSObject

	static new(): EZOutput; // inherited from NSObject

	static output(): EZOutput;

	static outputWithDataSource(dataSource: EZOutputDataSource): EZOutput;

	static outputWithDataSourceInputFormat(dataSource: EZOutputDataSource, inputFormat: AudioStreamBasicDescription): EZOutput;

	static sharedOutput(): EZOutput;

	clientFormat: AudioStreamBasicDescription;

	readonly converterAudioUnit: interop.Pointer | interop.Reference<any>;

	dataSource: EZOutputDataSource;

	delegate: EZOutputDelegate;

	device: EZAudioDevice;

	readonly graph: interop.Pointer | interop.Reference<any>;

	inputFormat: AudioStreamBasicDescription;

	readonly isPlaying: boolean;

	readonly mixerAudioUnit: interop.Pointer | interop.Reference<any>;

	readonly outputAudioUnit: interop.Pointer | interop.Reference<any>;

	pan: number;

	volume: number;

	constructor(o: { dataSource: EZOutputDataSource; });

	constructor(o: { dataSource: EZOutputDataSource; inputFormat: AudioStreamBasicDescription; });

	connectOutputOfSourceNodeSourceNodeOutputBusToDestinationNodeDestinationNodeInputBusInGraph(sourceNode: number, sourceNodeOutputBus: number, destinationNode: number, destinationNodeInputBus: number, graph: interop.Pointer | interop.Reference<any>): number;

	defaultClientFormat(): AudioStreamBasicDescription;

	defaultInputFormat(): AudioStreamBasicDescription;

	initWithDataSource(dataSource: EZOutputDataSource): this;

	initWithDataSourceInputFormat(dataSource: EZOutputDataSource, inputFormat: AudioStreamBasicDescription): this;

	outputAudioUnitSubType(): number;

	startPlayback(): void;

	stopPlayback(): void;
}

interface EZOutputDataSource extends NSObjectProtocol {

	outputShouldFillAudioBufferListWithNumberOfFramesTimestamp(output: EZOutput, audioBufferList: interop.Pointer | interop.Reference<AudioBufferList>, frames: number, timestamp: interop.Pointer | interop.Reference<AudioTimeStamp>): number;
}
declare var EZOutputDataSource: {

	prototype: EZOutputDataSource;
};

declare var EZOutputDefaultSampleRate: number;

interface EZOutputDelegate extends NSObjectProtocol {

	outputChangedDevice?(output: EZOutput, device: EZAudioDevice): void;

	outputChangedPlayingState?(output: EZOutput, isPlaying: boolean): void;

	outputPlayedAudioWithBufferSizeWithNumberOfChannels?(output: EZOutput, buffer: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, bufferSize: number, numberOfChannels: number): void;
}
declare var EZOutputDelegate: {

	prototype: EZOutputDelegate;
};

declare var EZOutputMaximumFramesPerSlice: number;

declare class EZPlot extends UIView {

	static alloc(): EZPlot; // inherited from NSObject

	static appearance(): EZPlot; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): EZPlot; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): EZPlot; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): EZPlot; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): EZPlot; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): EZPlot; // inherited from UIAppearance

	static new(): EZPlot; // inherited from NSObject

	color: UIColor;

	gain: number;

	plotType: EZPlotType;

	shouldFill: boolean;

	shouldMirror: boolean;

	clear(): void;

	updateBufferWithBufferSize(buffer: interop.Pointer | interop.Reference<number>, bufferSize: number): void;
}

declare const enum EZPlotType {

	Buffer = 0,

	Rolling = 1
}

declare class EZRecorder extends NSObject {

	static alloc(): EZRecorder; // inherited from NSObject

	static new(): EZRecorder; // inherited from NSObject

	static recorderWithDestinationURLSourceFormatDestinationFileType(url: NSURL, sourceFormat: AudioStreamBasicDescription, destinationFileType: EZRecorderFileType): EZRecorder;

	static recorderWithURLClientFormatFileFormatAudioFileTypeID(url: NSURL, clientFormat: AudioStreamBasicDescription, fileFormat: AudioStreamBasicDescription, audioFileTypeID: number): EZRecorder;

	static recorderWithURLClientFormatFileFormatAudioFileTypeIDDelegate(url: NSURL, clientFormat: AudioStreamBasicDescription, fileFormat: AudioStreamBasicDescription, audioFileTypeID: number, delegate: EZRecorderDelegate): EZRecorder;

	static recorderWithURLClientFormatFileType(url: NSURL, clientFormat: AudioStreamBasicDescription, fileType: EZRecorderFileType): EZRecorder;

	static recorderWithURLClientFormatFileTypeDelegate(url: NSURL, clientFormat: AudioStreamBasicDescription, fileType: EZRecorderFileType, delegate: EZRecorderDelegate): EZRecorder;

	clientFormat: AudioStreamBasicDescription;

	readonly currentTime: number;

	delegate: EZRecorderDelegate;

	readonly duration: number;

	readonly fileFormat: AudioStreamBasicDescription;

	readonly formattedCurrentTime: string;

	readonly formattedDuration: string;

	readonly frameIndex: number;

	readonly totalFrames: number;

	constructor(o: { destinationURL: NSURL; sourceFormat: AudioStreamBasicDescription; destinationFileType: EZRecorderFileType; });

	constructor(o: { URL: NSURL; clientFormat: AudioStreamBasicDescription; fileFormat: AudioStreamBasicDescription; audioFileTypeID: number; });

	constructor(o: { URL: NSURL; clientFormat: AudioStreamBasicDescription; fileFormat: AudioStreamBasicDescription; audioFileTypeID: number; delegate: EZRecorderDelegate; });

	constructor(o: { URL: NSURL; clientFormat: AudioStreamBasicDescription; fileType: EZRecorderFileType; });

	constructor(o: { URL: NSURL; clientFormat: AudioStreamBasicDescription; fileType: EZRecorderFileType; delegate: EZRecorderDelegate; });

	appendDataFromBufferListWithBufferSize(bufferList: interop.Pointer | interop.Reference<AudioBufferList>, bufferSize: number): void;

	closeAudioFile(): void;

	initWithDestinationURLSourceFormatDestinationFileType(url: NSURL, sourceFormat: AudioStreamBasicDescription, destinationFileType: EZRecorderFileType): this;

	initWithURLClientFormatFileFormatAudioFileTypeID(url: NSURL, clientFormat: AudioStreamBasicDescription, fileFormat: AudioStreamBasicDescription, audioFileTypeID: number): this;

	initWithURLClientFormatFileFormatAudioFileTypeIDDelegate(url: NSURL, clientFormat: AudioStreamBasicDescription, fileFormat: AudioStreamBasicDescription, audioFileTypeID: number, delegate: EZRecorderDelegate): this;

	initWithURLClientFormatFileType(url: NSURL, clientFormat: AudioStreamBasicDescription, fileType: EZRecorderFileType): this;

	initWithURLClientFormatFileTypeDelegate(url: NSURL, clientFormat: AudioStreamBasicDescription, fileType: EZRecorderFileType, delegate: EZRecorderDelegate): this;

	url(): NSURL;
}

interface EZRecorderDelegate extends NSObjectProtocol {

	recorderDidClose?(recorder: EZRecorder): void;

	recorderUpdatedCurrentTime?(recorder: EZRecorder): void;
}
declare var EZRecorderDelegate: {

	prototype: EZRecorderDelegate;
};

declare const enum EZRecorderFileType {

	AIFF = 0,

	M4A = 1,

	WAV = 2
}

declare const enum ExportFormat {

	Wav = 0,

	Aif = 1,

	Mp4 = 2,

	M4a = 3,

	Caf = 4
}

declare class MultitouchGestureRecognizer extends UIGestureRecognizer {

	static alloc(): MultitouchGestureRecognizer; // inherited from NSObject

	static new(): MultitouchGestureRecognizer; // inherited from NSObject

	count: number;

	sustain: boolean;

	readonly touches: NSArray<UITouch>;
}

interface MultitouchGestureRecognizerDelegate extends UIGestureRecognizerDelegate {

	multitouchGestureRecognizerTouchDidBegin?(gestureRecognizer: MultitouchGestureRecognizer, touch: UITouch): void;

	multitouchGestureRecognizerTouchDidCancel?(gestureRecognizer: MultitouchGestureRecognizer, touch: UITouch): void;

	multitouchGestureRecognizerTouchDidEnd?(gestureRecognizer: MultitouchGestureRecognizer, touch: UITouch): void;

	multitouchGestureRecognizerTouchDidMove?(gestureRecognizer: MultitouchGestureRecognizer, touch: UITouch): void;
}
declare var MultitouchGestureRecognizerDelegate: {

	prototype: MultitouchGestureRecognizerDelegate;
};

declare const enum SessionCategory {

	Ambient = 0,

	SoloAmbient = 1,

	Playback = 2,

	Record = 3,

	PlayAndRecord = 4,

	AudioProcessing = 5,

	MultiRoute = 6
}

declare var kEZAudioPlotDefaultHistoryBufferLength: number;

declare var kEZAudioPlotMaxHistoryBufferLength: number;
