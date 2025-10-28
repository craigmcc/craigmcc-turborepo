/**
 * Functional tests for ListActions.
 */

// External Modules ----------------------------------------------------------

import { ERRORS } from "@repo/daisy-tanstack-form/ActionResult";
import { MemberRole } from "@repo/db-shopshop/dist";

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

    it("should fail on unauthenticated Profile", async () => {

      setTestProfile(null);
      const list: ListCreateSchemaType = {
        name: LISTS[0].name!,
      };

      const result = await createList(list);

      expect(result.message).toBe(ERRORS.AUTHENTICATION);

    });

    it("should pass with valid data", async () => {

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

  describe("removeList", () => {

    it("should fail on GUEST Member", async () => {

      const profile = await UTILS.lookupProfile(PROFILES[0].email!);
      setTestProfile(profile);
      const list = await UTILS.lookupListByRole(profile, MemberRole.GUEST);

      const result = await removeList(list.id);

      expect(result.message).toBe(ERRORS.NOT_ADMIN);

    });

    it("should fail on non-Member user", async () => {

      const profile = await UTILS.lookupProfile(PROFILES[0].email!);
      setTestProfile(profile);
      const list = await UTILS.lookupListByName(LISTS[2].name!);

      const result = await removeList(list.id);

      expect(result.message).toBe(ERRORS.NOT_ADMIN);

    });

    it("should fail on unauthenticated Profile", async () => {

      const profile = await UTILS.lookupProfile(PROFILES[0].email!);
      setTestProfile(null); // This is deliberate
      const list = await UTILS.lookupListByRole(profile, MemberRole.ADMIN);

      const result = await removeList(list.id);

      expect(result.message).toBe(ERRORS.AUTHENTICATION);

    });

    it("should pass on ADMIN Member with valid data", async () => {

      const profile = await UTILS.lookupProfile(PROFILES[0].email!);
      setTestProfile(profile);
      const list = await UTILS.lookupListByRole(profile, MemberRole.ADMIN);

      const result = await removeList(list.id);

      expect(result.model).toBeDefined();
      expect(result.model!.id).toBe(list.id);
      expect(result.model!.name).toBe(list.name);

    });

  });

  describe("updateList", () => {

    it("should fail on GUEST Member with valid data", async () => {

      const profile = await UTILS.lookupProfile(PROFILES[0].email!);
      setTestProfile(profile);
      const list = await UTILS.lookupListByRole(profile, MemberRole.GUEST);

      const update: ListUpdateSchemaType = {
        name: "Updated List",
      }
      const result = await updateList(list.id, update);

      expect(result.message).toBe(ERRORS.NOT_ADMIN);

    });

    it("should fail on invalid data", async () => {

      const profile = await UTILS.lookupProfile(PROFILES[0].email!);
      setTestProfile(profile);
      const list = await UTILS.lookupListByRole(profile, MemberRole.ADMIN);

      const update: ListUpdateSchemaType = {
        name: "",
      }
      const result = await updateList(list.id, update);

      expect(result.message).toBe(ERRORS.DATA_VALIDATION);

    });

    it("should fail on non-Member with valid data", async () => {

      const profile = await UTILS.lookupProfile(PROFILES[0].email!);
      setTestProfile(profile);
      const list = await UTILS.lookupListByRole(profile, null);

      const update: ListUpdateSchemaType = {
        name: "Updated List",
      }
      const result = await updateList(list.id, update);

      expect(result.message).toBe(ERRORS.NOT_ADMIN);

    });

    it("should fail on unauthenticated Profile", async () => {

      const profile = await UTILS.lookupProfile(PROFILES[0].email!);
      setTestProfile(null); // This is deliberate
      const list = await UTILS.lookupListByRole(profile, MemberRole.ADMIN);

      const update: ListUpdateSchemaType = {
        name: "Updated List",
      }
      const result = await updateList(list.id, update);

      expect(result.message).toBe(ERRORS.AUTHENTICATION);

    });

    it("should pass on ADMIN member with empty update", async () => {

      const profile = await UTILS.lookupProfile(PROFILES[0].email!);
      setTestProfile(profile);
      const list = await UTILS.lookupListByRole(profile, MemberRole.ADMIN);

      const update: ListUpdateSchemaType = {};
      const result = await updateList(list.id, update);

      expect(result.model!.name).toBe(list.name);

    });

    it("should pass on ADMIN member with valid data", async () => {

      const profile = await UTILS.lookupProfile(PROFILES[0].email!);
      setTestProfile(profile);
      const list = await UTILS.lookupListByRole(profile, MemberRole.ADMIN);

      const update: ListUpdateSchemaType = {
        name: "Updated List",
      }
      const result = await updateList(list.id, update);

      expect(result.model!.name).toBe(update.name);

    });

  });

});
