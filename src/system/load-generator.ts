import axios from "axios";

interface LoadGeneratorOptions {
    apiUrl: string;
    requestsPerSecond?: number;
    durationSeconds?: number;
}

export class LoadGenerator {
    private readonly apiUrl: string;
    private readonly requestsPerSecond: number;
    private readonly durationSeconds: number;

    constructor(loadGeneratorOptions: LoadGeneratorOptions) {
        this.apiUrl = loadGeneratorOptions.apiUrl;
        this.requestsPerSecond = loadGeneratorOptions.requestsPerSecond || 5;
        this.durationSeconds = loadGeneratorOptions.durationSeconds || 60;
    }

    private generateRandomPatient() {
        const randomlyGeneratedId = Math.floor(Math.random() * 10000);
        return {
            firstName: `Test${randomlyGeneratedId}`,
            lastName: `User${randomlyGeneratedId}`,
            birthDate: "2000-06-25",
            phoneNumber: `+38063${Math.floor(1000000 + Math.random() * 8999999)}`,
        };
    }

    private async sendCreatePatientRequest(): Promise<void> {
        try {
            const patient = this.generateRandomPatient();
            const response = await axios.post(`${this.apiUrl}/api/patients`, patient);
            console.log(`[SUCCESS] Created patient: ${response.data.id}`);
        } catch (error: any) {
            console.error(`[ERROR] errors array details: ${JSON.stringify(error, null, 4)}`);
        }
    }

    public async run(): Promise<void> {
        const interval = 1000 / this.requestsPerSecond;
        const iterations = this.durationSeconds * this.requestsPerSecond;

        for (let requestIndex = 0; requestIndex < iterations; requestIndex++) {
            await this.sendCreatePatientRequest();
            await new Promise(response => setTimeout(response, interval));
        }

        console.log(`Load test finished: ${this.requestsPerSecond} RPS for ${this.durationSeconds} seconds`);
    }
}

if (require.main === module) {
    const generator = new LoadGenerator({
        apiUrl: process.env.API_URL || "http://localhost:3000/local/",
        requestsPerSecond: parseInt(process.env.RPS || "5"),
        durationSeconds: parseInt(process.env.DURATION || "60"),
    });

    generator.run();
}
