import { z } from "zod";
import { tableSchema } from "@/types/api/application";

const reverseActionSchema = z.object({
    action_type: z.string(),
});
  
const reverseActionDeleteSchema = reverseActionSchema.extend({
    action_type: z.literal('delete'),
    ids: z.array(z.any()),
    target_table: tableSchema,
    application_name: z.string(),
});
  
const reverseActionUpdateSchema = reverseActionSchema.extend({
    action_type: z.literal('update'),
    reverse_filter_conditions: z.record(z.any()),
    reverse_updated_data: z.record(z.any()),
    target_table: tableSchema,
    application_name: z.string(),
});
  
const reverseActionPostSchema = reverseActionSchema.extend({
    action_type: z.literal('post'),
    deleted_data: z.array(z.record(z.any())),
    target_table: tableSchema,
    application_name: z.string(),
});
  
const reverseActionGetSchema = reverseActionSchema.extend({
    action_type: z.literal('get'),
});

const reverseActionClarificationSchema = reverseActionSchema.extend({
    action_type: z.literal('clarification'),
});
  
const reverseActionUnionSchema = z.discriminatedUnion('action_type', [
    reverseActionDeleteSchema,
    reverseActionUpdateSchema,
    reverseActionPostSchema,
    reverseActionGetSchema,
    reverseActionClarificationSchema,
]);
  
export const reverseActionWrapperSchema = z.object({
    action: reverseActionUnionSchema,
});

export type ReverseActionWrapper = z.infer<typeof reverseActionWrapperSchema>;