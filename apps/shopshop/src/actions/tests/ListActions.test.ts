/**
 * Functional tests for ListActions.
 */

// External Modules ----------------------------------------------------------

import { MemberRole } from "@repo/db-shopshop/dist";
import { ERRORS } from "@repo/tanstack-form/ActionResult";
import { beforeEach, describe, expect, it } from "vitest";

// Internal Modules ----------------------------------------------------------

import { createList, removeList, updateList } from "@/actions/ListActions";
import { setTestProfile } from "@/lib/ProfileHelpers";
import { ActionUtils } from "@/test/ActionUtils";
import { LISTS, PROFILES } from "@/test/SeedData";
import { ListCreateSchemaType, ListUpdateSchemaType } from "@/zod-schemas/ListSchema";

const UTILS = new ActionUtils();

// Test Specifications -------------------------------------------------------

describe("ListActions", () => {

  // Test Hooks --------------------------------------------------------------

  beforeEach(async () => {
    await UTILS.loadData({
      withLists: true,
      withMembers: true,
      withProfiles: true,
    });
  });

  // Test Methods ------------------------------------------------------------

  describe("createList", () => {

    it("should fail on invalid data", async () => {

      const profile = await UTILS.lookupProfile(PROFILES[1].email!);
      setTestProfile(profile);
      const list: ListCreateSchemaType = {
        name: "",
      };

      const result = await createList(list);

      expect(result.message).toBe(ERRORS.DATA_VALIDATION);

    });

    it("should fail on not authenticated", async () => {

      setTestProfile(null);
      const list: ListCreateSchemaType = {
        name: LISTS[0].name!,
      };

      const result = await createList(list);

      expect(result.message).toBe(ERRORS.AUTHENTICATION);

    });

    it("should pass on create a new List", async () => {

      const profile = await UTILS.lookupProfile(PROFILES[1].email!);
      setTestProfile(profile);
      const list: ListCreateSchemaType = {
        name: LISTS[0].name!,
        private: LISTS[0].private,
        imageUrl: LISTS[0].imageUrl!,
      };

      const result = await createList(list);

      expect(result.model).toBeDefined();
      expect(result.model!.name).toBe(LISTS[0].name);
      expect(result.model!.private).toBe(LISTS[0].private);
      expect(result.model!.members!.length).toBe(1);
      expect(result.model!.members![0].profileId).toBe(profile.id);
      expect(result.model!.members![0].role).toBe(MemberRole.ADMIN);

    });

  });

});
