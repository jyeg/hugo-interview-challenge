import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@client/components/ui/form';
import { Input } from '@client/components/ui/input';
import { Button } from '@client/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@client/components/ui/select';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Application } from '@common/lib/types';

export function DependentForm() {
  const { control } = useFormContext<Application>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additionalPeople',
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Add Dependents</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded">
          <FormField
            control={control}
            name={`additionalPeople.${index}.firstName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`additionalPeople.${index}.lastName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`additionalPeople.${index}.dateOfBirth`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`additionalPeople.${index}.relationship`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Friend">Friend</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" variant="destructive" onClick={() => remove(index)}>
            Remove Person
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({ firstName: '', lastName: '', dateOfBirth: '', relationship: 'Other' })
        }
      >
        Add Person
      </Button>
    </div>
  );
}
