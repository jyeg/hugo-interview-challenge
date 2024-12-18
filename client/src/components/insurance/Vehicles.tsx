import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@client/components/ui/form';
import { Input } from '@client/components/ui/input';
import { Button } from '@client/components/ui/button';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Application } from '@common/lib/types';

export function VehicleForm() {
  const { control } = useFormContext<Application>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vehicles',
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Vehicles</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded">
          <FormField
            control={control}
            name={`vehicles.${index}.vin`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>VIN</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`vehicles.${index}.year`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`vehicles.${index}.makeModel`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make and Model</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {fields.length > 1 && (
            <Button type="button" variant="destructive" onClick={() => remove(index)}>
              Remove Vehicle
            </Button>
          )}
        </div>
      ))}
      {fields.length < 3 && (
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ vin: '', year: 2024, makeModel: '' })}
        >
          Add Vehicle
        </Button>
      )}
    </div>
  );
}
