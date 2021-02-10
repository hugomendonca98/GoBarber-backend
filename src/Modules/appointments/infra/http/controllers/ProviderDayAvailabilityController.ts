import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvaliabilityService';

export default class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { month, day, year } = request.body;

        const ListProviderDayAvailability = container.resolve(
            ListProviderDayAvailabilityService,
        );

        const availability = await ListProviderDayAvailability.execute({
            provider_id,
            month,
            day,
            year,
        });

        return response.json(availability);
    }
}
