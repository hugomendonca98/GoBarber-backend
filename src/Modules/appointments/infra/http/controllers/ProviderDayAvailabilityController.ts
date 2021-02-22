import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvaliabilityService';

export default class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { month, day, year } = request.query;

        const ListProviderDayAvailability = container.resolve(
            ListProviderDayAvailabilityService,
        );

        const availability = await ListProviderDayAvailability.execute({
            provider_id,
            month: Number(month),
            day: Number(day),
            year: Number(year),
        });

        return response.json(availability);
    }
}
