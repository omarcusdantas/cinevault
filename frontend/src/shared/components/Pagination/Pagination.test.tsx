import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Pagination } from "./index";

const mockRouter = {
  push: vi.fn(),
};
const mockPathname = "/movies";
let mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams,
}));

describe("Pagination component", () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
    mockSearchParams = new URLSearchParams();
  });

  it("should not render if totalPages is 1 or less", () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} />);
    expect(container.firstChild).toBeNull();
  });

  it("should add the search prop as a search parameter if it does not exist", () => {
    render(<Pagination currentPage={2} totalPages={5} search="action" />);
    const prevButton = screen.getByRole("button", { name: /previous page/i });
    fireEvent.click(prevButton);
    expect(mockRouter.push).toHaveBeenCalledWith("/movies?search=action&page=1");
  });
});
